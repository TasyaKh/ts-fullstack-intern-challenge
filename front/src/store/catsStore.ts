import { makeObservable, observable, action } from "mobx";
import { catApi, CatImage } from "../api/catApi";

class CatsStore {
  @observable
  cats: CatImage[] = [];

  @observable
  page: number = 0;

  @observable
  loading: boolean = false;

  @observable
  hasMore: boolean = true;

  constructor() {
    makeObservable(this);
    this.loadMoreCats = this.loadMoreCats.bind(this);
  }

  @action
  setCats(newCats: CatImage[]) {
    if (newCats.length === 0) {
      this.hasMore = false;
    } else {
      this.cats = [...this.cats, ...newCats];
      this.page += 1;
    }
  }

  @action
  async loadMoreCats() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    try {
      const newCats = await catApi.getImages({
        page: this.page,
        limit: 15,
      });
      this.setCats(newCats);
    } catch (error) {
      console.error("Error loading cats:", error);
    } finally {
      this.loading = false;
    }
  }
}

const catsStore = new CatsStore();
export default catsStore;