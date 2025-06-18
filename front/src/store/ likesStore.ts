import { makeAutoObservable, runInAction } from "mobx";
import { likesApi } from "../api/likesApi";

class LikesStore {
  likedCatIds = new Set<string>();

  constructor() {
    makeAutoObservable(this);
  }

  async loadLikedCatIds() {
    const likes = await likesApi.getAllLikes();
    runInAction(() => {
      this.likedCatIds = new Set(likes.map(like => like.catId));
    });
  }

  isLiked(catId: string) {
    return this.likedCatIds.has(catId);
  }

  async addLike(catId: string) {
    await likesApi.addLike(catId);
    runInAction(() => {
      this.likedCatIds.add(catId);
    });
  }

  async removeLike(catId: string) {
    await likesApi.removeLike(catId);
    runInAction(() => {
      this.likedCatIds.delete(catId);
    });
  }
}

const likesStore = new LikesStore();
export default likesStore;
