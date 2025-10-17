
import { API_CONFIG } from "./apiconfig.js";
import { Coordinates, ForcastData, GeocodingResponse, WeatherData } from "./types.js";
class WeatherAPI {
  private createURL(endpoint: string, params: Record<string, string | number>) {
   
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,...params
    });
    return `${endpoint}?${searchParams.toString()}`
  }


  private async fetchData<T>(url:string):Promise<T>{
    const response=await fetch(url);
    if(!response.ok){
        throw new Error (`Weather Api error:${response.statusText}`)
    }
   return response.json();
  }


  async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
    const url=this.createURL(`${API_CONFIG.BASE_URL}/weather`,{
        lat:lat.toString(),
        lon:lon.toString(),
        units:API_CONFIG.DEFAULT_PARAMS.units
    });
    return this.fetchData<WeatherData>(url)
  }

  async getForcast({lat,lon}:Coordinates):Promise<ForcastData>{
    const url=this.createURL(`${API_CONFIG.BASE_URL}/forecast`,{
        lat:lat.toString(),
        lon:lon.toString(),
        units:API_CONFIG.DEFAULT_PARAMS.units
    });
    return this.fetchData<ForcastData>(url)
  }

  async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
    const url=this.createURL(`${API_CONFIG.GEO}/reverse`,{
        lat:lat.toString(),
        lon:lon.toString(),
     limits:"1"
    });
    return this.fetchData<GeocodingResponse[]>(url)
  }

  async searchLocation(query:string):Promise<GeocodingResponse[]>{
    const url=this.createURL(`${API_CONFIG.GEO}/direct`,{
     q: query,   
     limits:"5"
    });
    return this.fetchData<GeocodingResponse[]>(url)
  }
}
export const weatherApi =new WeatherAPI()
