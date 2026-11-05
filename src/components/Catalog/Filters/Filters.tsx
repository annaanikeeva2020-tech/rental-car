"use client";

import { useCarsFilters } from "@/lib/hooks/useCarsFilters";
import { useState } from "react";
import type { CarsParams } from "@/lib/api/cars";
import styles from "./Filters.module.css";

interface FiltersProps {
  onSearch: (filters: CarsParams) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const { data, isPending, isError } = useCarsFilters();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  if (isPending) {
    return <p>Loading filters...</p>;
  }

  if (isError) {
    return <p>Failed to load filters</p>;
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="brand">
          Car brand
        </label>

        <select
          className={styles.select}
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        >
          <option value="">Choose a brand</option>

          {data.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="price">
          Price / 1 hour
        </label>

        <select
          className={styles.select}
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
          <option value="">Choose a price</option>

          {Array.from(
            { length: data.price.max - data.price.min + 1 },
            (_, index) => data.price.min + index,
          ).map((price) => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Car mileage / km</label>

        <div className={styles.mileageGroup}>
          <input
            className={styles.mileageInput}
            id="minMileage"
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(event) => setMinMileage(event.target.value)}
          />

          <input
            className={styles.mileageInput}
            id="maxMileage"
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(event) => setMaxMileage(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.searchButton}
          type="button"
          onClick={() =>
            onSearch({
              brand: brand || undefined,
              price: price ? Number(price) : undefined,
              minMileage: minMileage ? Number(minMileage) : undefined,
              maxMileage: maxMileage ? Number(maxMileage) : undefined,
            })
          }
        >
          Search
        </button>

        <button
          className={styles.clearButton}
          type="button"
          onClick={() => {
            setBrand("");
            setPrice("");
            setMinMileage("");
            setMaxMileage("");
            onSearch({});
          }}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
