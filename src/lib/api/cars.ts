import api from "./api";

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage?: number;
}

export async function getCars(params: CarsParams = {}) {
  const response = await api.get<CarsResponse>("/cars", {
    params,
  });

  return response.data;
}

export interface CarsFilters {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export async function getCarsFilters() {
  const response = await api.get<CarsFilters>("/cars/filters");

  return response.data;
}