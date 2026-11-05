import styles from "./NoCarsFound.module.css";
import Image from "next/image";

interface NoCarsFoundProps {
  onResetFilters: () => void;
}

export default function NoCarsFound({ onResetFilters }: NoCarsFoundProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.image}>
        <Image
          src="/images/nocarsfound-new.webp"
          alt="No cars found"
          width={413}
          height={388}
        />
      </div>

      <h2 className={styles.title}>No cars found</h2>

      <p className={styles.description}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>

      <button
        className={styles.resetButton}
        type="button"
        onClick={onResetFilters}
      >
        <span className={styles.resetButtonText}>Reset filters</span>
      </button>
    </div>
  );
}
