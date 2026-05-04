package Widgets.GameWidget;

import com.google.gson.annotations.SerializedName;

public class GameDeal implements IGameDeal{
  @SerializedName("storeID")  //
  private String storeId;
  private Store store;
  private Float price;
  private Float retailPrice;
  private Float savings;

  GameDeal(GameDeal gameDeal, Store store){
    this.storeId = gameDeal.storeId;
    this.price = gameDeal.price;
    this.retailPrice = gameDeal.retailPrice;
    this.savings = gameDeal.savings;;
    this.store = store;
  }
  @Override
  public String getStoreId() {
    return this.storeId;
  }

  @Override
  public Store getStore() {
    return this.store;
  }

  @Override
  public Float getPrice() {
    return this.price;
  }

  @Override
  public Float getRetailPrice() {
    return this.retailPrice;
  }

  @Override
  public Float getSavings() {
    return this.savings;
  }

  @Override
  public void setStoreId(String storeId) {
    this.storeId = storeId;
  }

  @Override
  public void setStore(Store store) {
    this.store = store;
  }

  @Override
  public void setPrice(Float price) {
    this.price = price;
  }

  @Override
  public void setRetailPrice(Float retailPrice) {
    this.retailPrice = retailPrice;
  }

  @Override
  public void setSavings(Float savings) {
    this.savings = savings;
  }
}
