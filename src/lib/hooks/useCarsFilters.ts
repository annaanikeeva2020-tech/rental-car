import { useQuery } from "@tanstack/react-query";
import { getCarsFilters } from "@/lib/api/cars";

export function useCarsFilters() {
  return useQuery({
    queryKey: ["cars", "filters"],
    queryFn: getCarsFilters,
  });
}