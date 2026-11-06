"use client";

import styles from "./BookingForm.module.css";

export default function BookingForm() {
  return (
    <div className={styles.bookingForm}>
      <h2 className={styles.title}>Book your car now</h2>

      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name*"
          required
        />

        <input
          className={styles.input}
          type="email"
          placeholder="Email*"
          required
        />

        <textarea className={styles.textarea} placeholder="Comment" required />

        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
