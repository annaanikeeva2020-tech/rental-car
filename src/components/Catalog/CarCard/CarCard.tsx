import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/api/cars";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className={styles.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={244}
        height={268}
        unoptimized
        className={styles.image}
        priority
      />

      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>

          <p className={styles.price}>${car.rentalPrice}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.detailsRow}>
            <span>{car.location.city}</span>
            <span>{car.location.country}</span>
            <span>{car.rentalCompany}</span>
          </div>

          <div className={styles.detailsRow}>
            <span>Suv</span>
            <span>{car.mileage.toLocaleString("uk-UA")} km</span>
          </div>
        </div>

        <Link
          href={`/catalog/${car.id}`}
          target="_blank"
          className={styles.button}
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
