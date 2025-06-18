import { makeObservable, observable, action } from "mobx";
import { catApi, CatImage } from "../api/catApi";
import { likesApi } from "../api/likesApi";

class FavoriteCatsStore {
  @observable
  cats: CatImage[] = [];

  @observable
  loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setCats(newCats: CatImage[]) {
    this.cats = newCats;
  }

  @action
  async loadFavoriteCats() {
    if (this.loading) return;

    this.loading = true;
    try {
      const likes = await likesApi.getAllLikes();
      
      const catPromises = likes.map(like => catApi.getImageById(like.catId));
      const cats = await Promise.all(catPromises);
      this.setCats(cats);
    } catch (error) {
      console.error("Error loading favorite cats:", error);
    } finally {
      this.loading = false;
    }
  }
}

const favoriteCatsStore = new FavoriteCatsStore();
export default favoriteCatsStore; 