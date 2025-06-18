import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import CatCard from "../../components/CatCard/CatCard";
import catsStore from "../../store/catsStore";
import styles from "./AllCats.module.scss";
import likesStore from "../../store/ likesStore";

const AllCats = observer(() => {
  useEffect(() => {
    likesStore.loadLikedCatIds();
    catsStore.loadMoreCats();
  }, []);

  const handleLike = async (catId: string) => {
    if (likesStore.isLiked(catId)) {
      await likesStore.removeLike(catId);
    } else {
      await likesStore.addLike(catId);
    }
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={catsStore.cats.length}
        next={catsStore.loadMoreCats}
        hasMore={catsStore.hasMore}
        loader={
          <div className={styles.endMessage}>... загружаем еще котиков ...</div>
        }
        endMessage={
          <div className={styles.endMessage}>Больше котиков нет 😿</div>
        }
      >
        <div className={styles.grid}>
          {catsStore.cats.map((cat, index) => (
            <CatCard
              key={`${cat.id} ${index}`}
              cat={cat}
              isLiked={likesStore.isLiked(cat.id)}
              onLike={() => handleLike(cat.id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
});

export default AllCats;
