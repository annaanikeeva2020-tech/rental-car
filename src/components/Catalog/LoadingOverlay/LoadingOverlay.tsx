import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loadingBox}>
        <div className={styles.spinner} />

        <h2 className={styles.title}>Loading cars...</h2>

        <p className={styles.description}>
          Please wait while we fetch the best cars for you
        </p>
      </div>
    </div>
  );
}
