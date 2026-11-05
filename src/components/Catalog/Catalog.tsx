"use client";

import { useState } from "react";
import Filters from "./Filters/Filters";
import CarList from "./CarList/CarList";
import styles from "./Catalog.module.css";
import type { CarsParams } from "@/lib/api/cars";

export default function Catalog() {
  const [filters, setFilters] = useState<CarsParams>({});

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.container}>
        <Filters onSearch={setFilters} />
        <CarList filters={filters} onResetFilters={handleResetFilters} />
      </div>
    </section>
  );
}
