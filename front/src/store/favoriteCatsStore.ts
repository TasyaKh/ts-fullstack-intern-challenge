import { catApi, CatImage } from "../api/catApi";
import { makeAutoObservable, runInAction } from "mobx";
import likesStore from "./ likesStore";

async function fetchCatWithRetry(
  catId: string,
  maxRetries = 5,
  delay = 500
): Promise<CatImage | null> {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await catApi.getImageById(catId);
    } catch (error: any) {
      if (error?.response?.status === 429) {
        await new Promise((res) => setTimeout(res, delay));
        retries++;
      } else {
        break;
      }
    }
  }
  return null;
}

class FavoriteCatsStore {
  cats: CatImage[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadFavoriteCats() {
    if (this.loading) return;
    this.loading = true;
    this.cats = [];

    try {
      await likesStore.loadLikedCatIds();

      const fetchPromises = Array.from(likesStore.likedCatIds).map((id) =>
        fetchCatWithRetry(id)
      );

      const results = await Promise.all(fetchPromises);

      runInAction(() => {
        this.cats = results.filter(Boolean) as CatImage[];
      });
    } catch (error) {
      console.error("Error loading favorite cats:", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async removeLike(catId: string) {
    this.cats = this.cats.filter((cat) => cat.id !== catId);
    await likesStore.removeLike(catId);
  }
}

const favoriteCatsStore = new FavoriteCatsStore();
export default favoriteCatsStore;
