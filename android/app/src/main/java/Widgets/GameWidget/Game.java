package Widgets.GameWidget;

import android.graphics.Bitmap;

import java.util.List;

public class Game implements IGame{
  private String id;
  private String title;
  private String steamAppId;
  private Bitmap thumb;
  private List<GameDeal> gameDeals;

  Game(String id, String title, String steamAppId, Bitmap thumb, List<GameDeal> gameDeals){
    this.id = id;
    this.title = title;
    this.steamAppId = steamAppId;
    this.thumb = thumb;
    this.gameDeals = gameDeals;
  }
  Game(){}
  @Override
  public String getId() {
    return this.id;
  }

  @Override
  public String getTitle() {
    return this.title;
  }

  @Override
  public String getSteamAppId() {
    return this.steamAppId;
  }

  @Override
  public Bitmap getThumb() {
    return this.thumb;
  }

  @Override
  public List<GameDeal> getGameDeals() {
    return this.gameDeals;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }

  @Override
  public void setTitle(String title) {
    this.title = title;
  }

  @Override
  public void setSteamAppId(String steamAppId) {
    this.steamAppId = steamAppId;
  }

  @Override
  public void setThumb(Bitmap thumb) {
    this.thumb = thumb;
  }

  @Override
  public void setGameDeals(List<GameDeal> gameDeals) {
    this.gameDeals = gameDeals;
  }
}
