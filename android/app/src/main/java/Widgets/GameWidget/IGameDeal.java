package Widgets.GameWidget;

public interface IGameDeal {
  String getStoreId();

  Store getStore();
  Float getPrice();
  Float getRetailPrice();

  Float getSavings();

  void setStoreId(String storeId);
  void setStore(Store store);
  void setPrice(Float price);
  void setRetailPrice(Float retailPrice);
  void setSavings(Float savings);
}
