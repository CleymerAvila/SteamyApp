package Widgets.GameWidget;

import android.graphics.Bitmap;

import java.util.List;
import java.util.Map;

public interface IStore {
  String getId();
  String getName();
  int isActive();

  Bitmap getLogo();

  Store.Image getImages();
  void setId(String id);
  void setName(String name);
  void setIsActive(int isActive);

  void setLogo(Bitmap logo);

  void setImages(Store.Image images);
}

