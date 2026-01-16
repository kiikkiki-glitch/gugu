
export enum AppView {
  LOGIN = 'LOGIN',
  EXPLORE = 'EXPLORE',
  DESTINATION_DETAIL = 'DESTINATION_DETAIL',
  VEHICLE_SELECTION = 'VEHICLE_SELECTION',
  ROUTE_MAP = 'ROUTE_MAP',
  HISTORY = 'HISTORY'
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  weather: string;
  rating: number;
  coordinates: { lat: number; lng: number };
}

export interface TripState {
  from: string;
  to: Destination | null;
  vehicle: Vehicle | null;
  weatherInfo: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Car' | 'Motorcycle' | 'SUV' | 'Van';
  description: string;
  icon: string;
  isGoodForRain: boolean;
  isGoodForHeat: boolean;
}

export interface TripHistory {
  id: string;
  date: string;
  from: string;
  to: string;
  vehicle: string;
  image: string;
}

export interface PlaceRecommendation {
  name: string;
  type: 'Hotel' | 'Restoran' | 'Ibadah' | 'SPBU';
  description: string;
}

export interface NearbyFacilities {
  hotels: PlaceRecommendation[];
  restaurants: PlaceRecommendation[];
  worshipPlaces: PlaceRecommendation[];
  gasStations: PlaceRecommendation[];
}
