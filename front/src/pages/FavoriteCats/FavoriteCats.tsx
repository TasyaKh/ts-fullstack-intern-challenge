import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CatCard from "../../components/CatCard/CatCard";
import favoriteCatsStore from "../../store/favoriteCatsStore";
import styles from "./FavoriteCats.module.scss";

const FavoriteCats = observer(() => {
  useEffect(() => {
    favoriteCatsStore.loadFavoriteCats();
  }, []);

  const handleLike = async (catId: string) => {
    await favoriteCatsStore.removeLike(catId);
  };

  return (
    <div className="container">
      <div className={styles.grid}>
        {favoriteCatsStore.cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isLiked={true}
            onLike={() => handleLike(cat.id)}
          />
        ))}
      </div>
      {favoriteCatsStore.loading && (
        <div className={styles.endMessage}>... загружаем котиков ...</div>
      )}
      {!favoriteCatsStore.loading && favoriteCatsStore.cats.length === 0 && (
        <div className={styles.endMessage}>Нет любимых котиков 😿</div>
      )}
    </div>
  );
});

export default FavoriteCats;
