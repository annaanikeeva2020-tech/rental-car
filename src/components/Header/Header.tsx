import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Rental<span>Car</span>
        </Link>

        <nav className={styles.navigation}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>

          <Link href="/catalog" className={styles.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
