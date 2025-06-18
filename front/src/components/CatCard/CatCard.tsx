import { CatImage } from '../../api/catApi';
import styles from './CatCard.module.scss';
import { SelectButton } from '../SelectButton/SelectButton';
import FavoriteIcon from '@/assets/icons/favorite.svg?react';
import FavoriteBorderIcon from '@/assets/icons/favorite_border.svg?react';

interface CatCardProps {
  cat: CatImage;
  isLiked: boolean;
  onLike: () => void;
}

const CatCard = ({ cat, isLiked, onLike }: CatCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={cat.url} alt={`Cat ${cat.id}`} loading="lazy" />
      </div>
      <div className={styles.favoriteWrapper}>
        <SelectButton
          selectedIcon={<FavoriteIcon />}
          hoveredIcon={<FavoriteIcon />}
          unselectedIcon={<FavoriteBorderIcon />}
          isSelected={isLiked}
          onClick={onLike}
        />
      </div>
    </div>
  );
};

export default CatCard;
