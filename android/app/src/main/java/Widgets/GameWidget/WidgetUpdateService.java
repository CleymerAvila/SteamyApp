package Widgets.GameWidget;

import android.annotation.SuppressLint;
import android.app.job.JobParameters;
import android.app.job.JobService;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.RemoteViews;

import com.bumptech.glide.Glide;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import io.ionic.starter.R;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class WidgetUpdateService extends JobService {

  private static final String BASE_URL = "https://www.cheapshark.com/api/1.0";
  private static final String CAPACITOR_PREFS = "CapacitorStorage";
  private static final String WIDGET_PREFS = "WidgetPrefs";

  private static final long INTERVAL_MS = 5000L;

  private Handler handler;
  private Runnable carrouselRunnable;
  private int widgetId;
  private int currentIndex = 0;
  private static Game game;
  private List<GameDeal> gameDeals = new ArrayList<>();
  private String lastFavoriteGameId = null;
  private ExecutorService executor;

  @Override
  public boolean onStartJob(JobParameters params) {

    executor = Executors.newFixedThreadPool(4);
    OkHttpClient httpClient = new OkHttpClient.Builder()
      .connectTimeout(15, TimeUnit.SECONDS)
      .readTimeout(15, TimeUnit.SECONDS)
      .build();

    widgetId = params.getExtras().getInt(
      AppWidgetManager.EXTRA_APPWIDGET_ID,
      AppWidgetManager.INVALID_APPWIDGET_ID
    );

    Log.d("WIDGET_DEBUG", "onStartJob ejecutado — widgetId: " + widgetId);

    // Ver TODO lo que hay en CapacitorStorage
    SharedPreferences prefs = getSharedPreferences("CapacitorStorage", MODE_PRIVATE);
    Map<String, ?> all = prefs.getAll();
    if (all.isEmpty()) {
      Log.e("WIDGET_DEBUG", "CapacitorStorage está VACÍO");
    } else {
      for (Map.Entry<String, ?> entry : all.entrySet()) {
        Log.d("WIDGET_DEBUG", "PREF → " + entry.getKey() + " = " + entry.getValue());
      }
    }

    // Ver el favorito específico
    String raw = prefs.getString("favorite", null);
    Log.d("WIDGET_DEBUG", "favorite raw: " + raw);
    // Iniciar el handler del carrusel
    initHandler();

    // true = el job sigue corriendo en background (no terminó aún)
    return true;
  }

  @Override
  public boolean onStopJob(JobParameters params) {
    // El sistema quiere detener el job → limpiar
    if (handler != null) handler.removeCallbacks(carrouselRunnable);
    if (executor != null) executor.shutdownNow();
    // true = re-encolar el job si fue interrumpido
    return true;
  }

  private void initHandler() {
    handler = new Handler(Looper.getMainLooper());
    carrouselRunnable = new Runnable() {
      @Override
      public void run() {
        String gameId = getFavoriteGameId(WidgetUpdateService.this);
        Log.d("WIDGET_DEBUG", "Handler tick — gameId: " + gameId
          + " | lastFavorite: " + lastFavoriteGameId
          + " | deals: " + gameDeals.size());
        if(Objects.isNull(gameId)){
          showWithNoFavorite();
          handler.postDelayed(this, INTERVAL_MS);
          return;
        }

        if(!gameId.equals(lastFavoriteGameId)){
          Log.d("WIDGET_DEBUG", "Favorito cambió → lanzando fetch");
          lastFavoriteGameId = gameId;
          currentIndex = 0;
          gameDeals.clear();

          showLoading();
          new FetchAllDealsTak(gameId).execute();
        } else if(!gameDeals.isEmpty()){
          Log.d("WIDGET_DEBUG", "Rotando carrusel → índice: " + currentIndex);
          rotateCarousel();
        } else {
          Log.w("WIDGET_DEBUG", "gameId igual pero gameDeals vacío — fetch en curso o falló");
        }

        handler.postDelayed(this, INTERVAL_MS);
      }
    };
    handler.post(carrouselRunnable);
  }

  private void showLoading() {
    if (widgetId == AppWidgetManager.INVALID_APPWIDGET_ID) return;

    AppWidgetManager manager = AppWidgetManager.getInstance(this);
    RemoteViews views = new RemoteViews(getPackageName(), R.layout.game_widget);

    // ✅ Fondo oscuro sólido para que no sea transparente
    views.setInt(R.id.img_background, "setBackgroundColor", 0xFF1A1A2E);

    views.setDisplayedChild(R.id.view_flipper, 0);
    views.setTextViewText(R.id.tv_title, "Cargando ofertas...");
    views.setTextViewText(R.id.tv_store_name_0, "");
    views.setTextViewText(R.id.tv_deal_price_0, "");
    views.setTextViewText(R.id.tv_retail_price_0, "");
    views.setTextViewText(R.id.tv_deal_savings_0, "");

    manager.updateAppWidget(widgetId, views);
  }

  private void rotateCarousel() {
    currentIndex = (currentIndex + 1 ) % gameDeals.size();
    int page = currentIndex % 2;
    Log.d("WIDGET_DEBUG", "rotateCarousel → índice: " + currentIndex + " | página: " + page);
    // renderGame(game, page);
    renderGameDeal(gameDeals.get(currentIndex), page);

  }

  private class FetchAllDealsTak {
    private final String gameId;
    private final OkHttpClient client = new OkHttpClient.Builder()
      .connectTimeout(15, TimeUnit.SECONDS)
      .readTimeout(15, TimeUnit.SECONDS)
      .build();

    FetchAllDealsTak(String gameId) {this.gameId = gameId ;}

    void execute() {
      executor.execute(() -> {
        Log.d("WIDGET_DEBUG", "Fetch iniciado para gameId: " + gameId);

        try {
          CompletableFuture<String> futureGame = CompletableFuture.supplyAsync(
            () -> get(BASE_URL +  "/games?id=" + gameId), executor
          );

          CompletableFuture<String> futureStores = CompletableFuture.supplyAsync(
            () -> get(BASE_URL + "/stores"), executor
          );

          CompletableFuture.allOf(futureGame, futureStores).join();

          String jsonGame = futureGame.get();
          String jsonStore = futureStores.get();

          Log.d("WIDGET_DEBUG", "jsonGame null: " + (jsonGame == null));
          Log.d("WIDGET_DEBUG", "jsonStore null: " + (jsonStore == null));

          if(jsonGame == null || jsonStore == null) {
            Log.e("WIDGET_DEBUG", "Respuesta nula — abortando fetch");
            return;
          };
          Gson gson = new Gson();

          JsonObject root = gson.fromJson(jsonGame, JsonObject.class);
          JsonObject info = root.getAsJsonObject("info");
          JsonArray dealsArray  = root.getAsJsonArray("deals");

          String title = info.get("title").getAsString();
          String thumb = info.get("thumb").getAsString();
          String steamAppId = info.get("steamAppID").getAsString();
          Log.d("WIDGET_DEBUG", "Título: " + title);
          Log.d("WIDGET_DEBUG", "Deals en respuesta: " + dealsArray.size());
          Bitmap thumbnailBitMap = Glide.with(WidgetUpdateService.this)
            .asBitmap().load(thumb).submit(400, 200).get();
          Log.d("WIDGET_DEBUG", "Thumbnail bitmap: " + (thumbnailBitMap != null ? "OK" : "NULL"));

          WidgetUpdateService.this.game = new Game();
          game.setTitle(title);
          game.setThumb(thumbnailBitMap);
          game.setSteamAppId(steamAppId);

          // renderGame(game, currentIndex);
          List<GameDeal> rawDeals = Arrays.asList(
            gson.fromJson(dealsArray, GameDeal[].class)
          );


          List<Store> stores = Arrays.asList(
            gson.fromJson(jsonStore, Store[].class)
          );

          Log.d("WIDGET_DEBUG", "Stores parseadas: " + stores.size());

          Map<String, Store> storeMap = new HashMap<>();

          for (Store s: stores) storeMap.put(s.getId(), s);

          Log.d("WIDGET_DEBUG", "stores saved: " + storeMap.values());

          List<CompletableFuture<GameDeal>> futures = new ArrayList<>();

          for(GameDeal gameDeal: rawDeals){
            CompletableFuture<GameDeal> f = CompletableFuture.supplyAsync(() -> {
              try {
                Store store = storeMap.get(gameDeal.getStoreId());
                GameDeal gDeal = new GameDeal(gameDeal, store);

                // Logo de la tienda → Bitmap
                if (store != null && store.getImages() != null) {
                  Bitmap logo = Glide.with(WidgetUpdateService.this)
                    .asBitmap().load( "https://www.cheapshark.com" + store.getImages().logo)
                    .submit(80, 80).get();
                  store.setLogo(logo);
                }
                return gDeal;
              } catch (Exception e) {
                Log.e("WIDGET_DEBUG", "Error procesando deal: " + e.getMessage());

                return null;
              }
            }, executor);
            futures.add(f);
          }

          List<GameDeal> result = new ArrayList<>();

          for(CompletableFuture<GameDeal> f: futures){
            GameDeal o = f.get();
            if(o != null) result.add(o);
          }
          Log.d("WIDGET_DEBUG", "Resultado final: " + result.size() + " deals");


          WidgetUpdateService.this.gameDeals = result;
          game.setGameDeals(result);
          currentIndex = 0;

          if(!gameDeals.isEmpty()) {
            Log.d("WIDGET_DEBUG", "Renderizando primer deal");
            // renderGame(game, currentIndex);
            renderGameDeal(result.get(0), 0);
          } else {
            Log.e("WIDGET_DEBUG", "result está vacío — nada que renderizar");
          }
        } catch (Exception e){
          Log.e("WIDGET_DEBUG", "EXCEPCIÓN en fetch: " + e.getMessage(), e);
          e.printStackTrace();
        }
      });
    }

    private String get(String url) {
      try {
        Response r = client.newCall(new Request.Builder().url(url).build()).execute();
        return r.body() != null ? r.body().string() : null;
      } catch (Exception e) { return null; }
    }
  }

  private void renderGameDeal(GameDeal gameDeal, int page){
    if(widgetId == AppWidgetManager.INVALID_APPWIDGET_ID) return;;
    AppWidgetManager manager = AppWidgetManager.getInstance(this);
    @SuppressLint("RemoteViewLayout") RemoteViews views = new RemoteViews(getPackageName(), R.layout.game_widget);


    int idStoreLogo  = page == 0 ? R.id.store_logo_0    : R.id.store_logo_1;
    int idStoreName  = page == 0 ? R.id.tv_store_name_0 : R.id.tv_store_name_1;
    int idDealPrice  = page == 0 ? R.id.tv_deal_price_0 : R.id.tv_deal_price_1;
    int idRetail     = page == 0 ? R.id.tv_retail_price_0 : R.id.tv_retail_price_1;
    int idSavings    = page == 0 ? R.id.tv_deal_savings_0 : R.id.tv_deal_savings_1;

    // deal data
    views.setImageViewBitmap(R.id.img_background, WidgetUpdateService.this.game.getThumb());
    views.setTextViewText(R.id.tv_title, WidgetUpdateService.this.game.getTitle());
    views.setTextViewText(idDealPrice, "$" + gameDeal.getPrice());
    views.setTextViewText(idRetail, "$" + gameDeal.getRetailPrice());
    views.setTextViewText(idSavings, "-" + Math.round(gameDeal.getSavings())+ "%");

    //
    if(gameDeal.getStore()!=null)
      views.setTextViewText(idStoreName, gameDeal.getStore().getName());
    if(gameDeal.getStore().getLogo() != null){
      views.setImageViewBitmap(idStoreLogo, gameDeal.getStore().getLogo());
    }

    views.setDisplayedChild(R.id.view_flipper, page);
    Log.d("WIDGET_DEBUG", "render página " + page
      + " | tienda: " + (gameDeal.getStore() != null ? gameDeal.getStore().getName() : "null")
      + " | logo: " + (gameDeal.getStore() != null && gameDeal.getStore().getLogo() != null ? "OK" : "NULL"));
    manager.updateAppWidget(widgetId, views);

  }

  private void showWithNoFavorite() {
    AppWidgetManager manager = AppWidgetManager.getInstance(this);
    @SuppressLint("RemoteViewLayout") RemoteViews views = new RemoteViews(getPackageName(), R.layout.game_widget);
    views.setTextViewText(R.id.tv_title, "Marca un juego como favorito en la app");
    manager.updateAppWidget(widgetId, views);
  }

  private String getFavoriteGameId(Context context){
    SharedPreferences sharedPreferences = context.getSharedPreferences(CAPACITOR_PREFS, Context.MODE_PRIVATE);
    String raw = sharedPreferences.getString("favorite", null);

    if(Objects.isNull(raw)) return  null;

    try {
      JSONObject favoriteDeal = new JSONObject(raw);
      return favoriteDeal.getString("gameId");
    } catch (JSONException e){
      return  null;
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    if (handler != null) handler.removeCallbacks(carrouselRunnable);
    executor.shutdownNow();
  }

}
