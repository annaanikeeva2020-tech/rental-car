"use client";

import { useCarsFilters } from "@/lib/hooks/useCarsFilters";
import { useEffect, useRef, useState } from "react";
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
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        brandRef.current &&
        !brandRef.current.contains(event.target as Node)
      ) {
        setIsBrandOpen(false);
      }

      if (
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setIsPriceOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className={styles.dropdown} ref={brandRef}>
          <button
            className={styles.select}
            type="button"
            onClick={() => {
              setIsBrandOpen(!isBrandOpen);
              setIsPriceOpen(false);
            }}
          >
            <span>{brand || "Choose a brand"}</span>

            <svg
              className={`${styles.arrow} ${isBrandOpen ? styles.arrowOpen : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#101828"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isBrandOpen && (
            <ul className={`${styles.dropdownList} ${styles.brandList}`}>
              {data.brands.map((item) => (
                <li key={item}>
                  <button
                    className={`${styles.dropdownOption} ${
                      brand === item ? styles.selectedOption : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setBrand(item);
                      setIsBrandOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="price">
          Price / 1 hour
        </label>
        <div className={styles.dropdown} ref={priceRef}>
          <button
            className={styles.select}
            type="button"
            onClick={() => {
              setIsPriceOpen(!isPriceOpen);
              setIsBrandOpen(false);
            }}
          >
            <span>{price ? `${price} $` : "Choose a price"}</span>

            <svg
              className={`${styles.arrow} ${isPriceOpen ? styles.arrowOpen : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#101828"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isPriceOpen && (
            <ul className={`${styles.dropdownList} ${styles.priceList}`}>
              {Array.from(
                {
                  length:
                    Math.floor(
                      (data.price.max - Math.ceil(data.price.min / 10) * 10) /
                        10,
                    ) + 1,
                },
                (_, index) => Math.ceil(data.price.min / 10) * 10 + index * 10,
              ).map((item) => (
                <li key={item}>
                  <button
                    className={`${styles.dropdownOption} ${
                      price === String(item) ? styles.selectedOption : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setPrice(String(item));
                      setIsPriceOpen(false);
                    }}
                  >
                    {item} $
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
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
