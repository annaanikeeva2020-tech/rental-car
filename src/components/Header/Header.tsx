"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isCatalogPage = pathname === "/catalog";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Rental<span>Car</span>
        </Link>

        <nav className={styles.navigation}>
          <Link
            href="/"
            className={`${styles.navLink} ${isHomePage ? styles.active : ""}`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${styles.navLink} ${isCatalogPage ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
