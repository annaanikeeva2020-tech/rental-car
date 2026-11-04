"use client";

import { useCars } from "@/lib/hooks/useCars";
import type { CarsParams } from "@/lib/api/cars";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";

interface CarListProps {
  filters: CarsParams;
}

export default function CarList({ filters }: CarListProps) {
  const { data, isPending, isError, error } = useCars(filters);

  if (isPending) {
    return <p>Loading cars...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const cars = data.pages.flatMap((page) => page.cars);

  return (
    <div className={styles.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
