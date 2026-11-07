import styles from "./page.module.css";
import { getCar } from "@/lib/api/cars";
import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCarSide,
  FaGasPump,
  FaCog,
  FaRoad,
  FaCheck,
} from "react-icons/fa";

interface CarDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await getCar(id);

  return (
    <main className={styles.main}>
      <div className={styles.details}>
        {/* Ліва колонка */}
        <div className={styles.leftColumn}>
          <Image
            className={styles.image}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            priority
          />
          <BookingForm carId={car.id} />
        </div>

        {/* Права колонка */}
        <div className={styles.rightColumn}>
          <div className={styles.titleRow}>
            <h1>
              {car.brand} {car.model}, {car.year}
            </h1>
            <span>Article: {car.id}</span>
          </div>

          <p className={styles.location}>
            <FaMapMarkerAlt className={styles.icon} />
            {car.location.city}, {car.location.country}
          </p>

          <p className={styles.price}>${car.rentalPrice}</p>

          <p className={styles.description}>{car.description}</p>

          {/* Rental Conditions */}
          <section className={styles.infoSection}>
            <h2>Rental Conditions:</h2>

            {car.rentalConditions.map((condition) => (
              <p key={condition} className={styles.infoItem}>
                <FaCheck className={styles.icon} />
                {condition}
              </p>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Car Specifications */}
          <section className={styles.infoSection}>
            <h2>Car Specifications:</h2>

            <p className={styles.infoItem}>
              <FaCalendarAlt className={styles.icon} />
              Year: {car.year}
            </p>
            <p className={styles.infoItem}>
              <FaCarSide className={styles.icon} />
              Type: {car.type}
            </p>
            <p className={styles.infoItem}>
              <FaGasPump className={styles.icon} />
              Fuel Consumption: {car.fuelConsumption}
            </p>
            <p className={styles.infoItem}>
              <FaCog className={styles.icon} />
              Engine: {car.engine}
            </p>
            <p className={styles.infoItem}>
              <FaRoad className={styles.icon} />
              Mileage: {car.mileage.toLocaleString("en-US")} km
            </p>
          </section>

          <hr className={styles.divider} />

          {/* Features */}
          <section className={styles.infoSection}>
            <h2>Features</h2>

            {car.features.map((feature) => (
              <p key={feature} className={styles.infoItem}>
                <FaCheck className={styles.icon} />
                {feature}
              </p>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
