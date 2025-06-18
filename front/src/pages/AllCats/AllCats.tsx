import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import CatCard from "../../components/CatCard/CatCard";
import catsStore from "../../store/catsStore";
import styles from "./AllCats.module.scss";
import { likesApi, LikeResponse } from "../../api/likesApi";

const AllCats = observer(() => {
  const [likes, setLikes] = useState<LikeResponse[]>([]);

  useEffect(() => {
    const loadLikes = async () => {
      const likesData = await likesApi.getAllLikes();
      setLikes(likesData);
    };
    loadLikes();
    catsStore.loadMoreCats();
  }, []);

  const handleLike = async (catId: string) => {
    const isLiked = likes.some(like => like.catId === catId);
    if (isLiked) {
      await likesApi.removeLike(catId);
      setLikes(likes.filter(like => like.catId !== catId));
    } else {
      const newLike = await likesApi.addLike(catId);
      setLikes([...likes, newLike]);
    }
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={catsStore.cats.length}
        next={catsStore.loadMoreCats}
        hasMore={catsStore.hasMore}
        loader={<div className={styles.endMessage}>... загружаем еще котиков ...</div>}
        endMessage={
          <div className={styles.endMessage}>Больше котиков нет 😿</div>
        }
      >
        <div className={styles.grid}>
          {catsStore.cats.map((cat, index) => (
            <CatCard 
              key={`${cat.id} ${index}`} 
              cat={cat} 
              isLiked={likes.some(like => like.catId === cat.id)}
              onLike={() => handleLike(cat.id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
});

export default AllCats;
