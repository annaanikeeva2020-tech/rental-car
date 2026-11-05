"use client";

import { useCars } from "@/lib/hooks/useCars";
import type { CarsParams } from "@/lib/api/cars";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import NoCarsFound from "../NoCarsFound/NoCarsFound";

interface CarListProps {
  filters: CarsParams;
  onResetFilters: () => void;
}

export default function CarList({ filters, onResetFilters }: CarListProps) {
  const {
    data,
    isError,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars(filters);

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <>
      {!isPending && cars.length === 0 ? (
        <NoCarsFound onResetFilters={onResetFilters} />
      ) : (
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {(isPending || isFetchingNextPage) && <LoadingOverlay />}
        </div>
      )}

      {cars.length > 0 && hasNextPage && (
        <button
          className={styles.loadMoreButton}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          <span className={styles.loadMoreText}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </span>
        </button>
      )}
    </>
  );
}
