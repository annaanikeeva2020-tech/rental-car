"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { sendBookingRequest } from "@/lib/api/cars";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

export default function BookingForm({ carId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const nameError = isSubmitted && !name.trim();
  const emailError = isSubmitted && !email.trim();
  const commentError = isSubmitted && !comment.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setMessage("");

    if (!name.trim() || !email.trim() || !comment.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      await sendBookingRequest(carId, {
        name: name.trim(),
        email: email.trim(),
        comment: comment.trim(),
      });

      setMessage("Your booking request has been sent successfully!");

      setName("");
      setEmail("");
      setComment("");
      setIsSubmitted(false);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.bookingForm}>
      <div className={styles.header}>
        <h2 className={styles.title}>Book your car now</h2>

        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            {nameError && <span className={styles.fieldLabel}>Name*</span>}
            <input
              className={`${styles.input} ${nameError ? styles.invalid : ""}`}
              type="text"
              placeholder="Name*"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {nameError && <FaExclamationCircle className={styles.errorIcon} />}
          </div>
          {nameError && (
            <p className={styles.errorMessage}>Please enter your name.</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            {emailError && <span className={styles.fieldLabel}>Email*</span>}
            <input
              className={`${styles.input} ${emailError ? styles.invalid : ""}`}
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && <FaExclamationCircle className={styles.errorIcon} />}
          </div>
          {emailError && (
            <p className={styles.errorMessage}>Please enter your email.</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            <textarea
              className={`${styles.textarea} ${commentError ? styles.invalid : ""}`}
              placeholder="Comment*"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            {commentError && (
              <FaExclamationCircle className={styles.errorIcon} />
            )}
          </div>
          {commentError && (
            <p className={styles.errorMessage}>Comment is required.</p>
          )}
        </div>

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading && <span className={styles.loader} />}
          {isLoading ? "Sending..." : "Send"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </div>
  );
}
