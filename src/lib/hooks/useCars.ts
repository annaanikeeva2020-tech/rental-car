import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars, type CarsParams } from "@/lib/api/cars";

const PER_PAGE = 12;

export function useCars(filters: CarsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["cars", filters],

    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        page: pageParam,
        perPage: PER_PAGE,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
}