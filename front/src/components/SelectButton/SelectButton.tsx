import { FC, ReactNode, useState } from 'react';
import styles from './SelectButton.module.scss';

interface IconButtonProps {
  selectedIcon: ReactNode;
  hoveredIcon: ReactNode;
  unselectedIcon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectButton: FC<IconButtonProps> = ({
  selectedIcon,
  hoveredIcon,
  unselectedIcon,
  isSelected,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${styles.iconButton}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSelected ? selectedIcon : isHovered ? hoveredIcon : unselectedIcon}
    </button>
  );
}; 