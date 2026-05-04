package Widgets.GameWidget;

import android.graphics.Bitmap;

import com.google.gson.annotations.SerializedName;


public class Store implements IStore{
  @SerializedName("storeID")
  private String id;
  @SerializedName("storeName")
  private  String name;
  @SerializedName("isActive")
  private int isActive;
  @SerializedName("images")
  private Image images;

  public class Image {
    @SerializedName("banner")
    String banner;
    @SerializedName("logo")
    String logo;
    @SerializedName("icon")
    String icon;

    public String getBanner(){
      return this.banner;
    }

    public String getLogo(){
      return this.logo;
    }

    public String getIcon(){
      return this.icon;
    }

  }

  private Bitmap logo;

  @Override
  public String getId() {
    return this.id;
  }

  @Override
  public String getName() {
    return this.name;
  }

  @Override
  public int isActive() {
    return this.isActive;
  }

  @Override
  public Bitmap getLogo() {
    return this.logo;
  }

  @Override
  public Image getImages() {
    return this.images;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }

  @Override
  public void setName(String name) {
    this.name = name;
  }

  @Override
  public void setIsActive(int isActive) {
    this.isActive = isActive;
  }

  @Override
  public void setLogo(Bitmap logo) {
    this.logo = logo;
  }

  @Override
  public void setImages(Image images) {
    this.images = images;
  }
}
