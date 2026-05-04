package Widgets.GameWidget;

import android.graphics.Bitmap;

import java.util.List;

public interface IGame {
  // getter methods
  String getId();
  String getTitle();
  String getSteamAppId();
  Bitmap getThumb();
  List<GameDeal> getGameDeals();

  // setters methods
  void setId(String id);
  void setTitle(String title);
  void setSteamAppId(String steamAppId);
  void setThumb(Bitmap thumb);
  void setGameDeals(List<GameDeal> gameDeals);
}
