import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const links = [
  { to: "/", text: "Все котики" },
  { to: "/favorites", text: "Любимые котики" },
];

const Navbar = () => (
  <nav className={styles.nav}>
    {links.map(({ to, text }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        end={to === "/"}
      >
        <span className={styles.linkWrapper}>{text}</span>
      </NavLink>
    ))}
  </nav>
);

export default Navbar;
