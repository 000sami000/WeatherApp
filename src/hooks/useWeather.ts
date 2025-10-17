import { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS={

    weather:(coords:Coordinates)=>{return ["weather",coords] as const},
    forecast:(coords:Coordinates)=>{return ["forecast",coords] as const},
    location:(coords:Coordinates)=>{return ["location",coords] as const},
    search:(query:string)=>{return ["location-search",query] as const},

} as const

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () =>
        coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
      enabled: !!coordinates,
    });
  }

  export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () => (coordinates ? weatherApi.getForcast(coordinates) : null),
      enabled: !!coordinates,
    });
  }

  
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () =>
        coordinates ? weatherApi.reverseGeocode(coordinates) : null,
      enabled: !!coordinates,
    });
  }
  
  export function useLocationSearch(query: string) {
    return useQuery({
      queryKey: WEATHER_KEYS.search(query),
      queryFn: () => weatherApi.searchLocation(query),
      enabled: query.length >= 3,
    });
  }