import { FC, ReactNode, useState } from "react";
import styles from "./SelectButton.module.scss";

interface IconButtonProps {
  selectedIcon: ReactNode;
  hoveredIcon: ReactNode;
  unselectedIcon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  width?: string;
  height?: string;
}

export const SelectButton: FC<IconButtonProps> = ({
  selectedIcon,
  hoveredIcon,
  unselectedIcon,
  isSelected,
  onClick,
  width = "40px",
  height = "40px",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${styles.iconButton}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width, height }}
    >
      {isSelected ? selectedIcon : isHovered ? hoveredIcon : unselectedIcon}
    </button>
  );
};
