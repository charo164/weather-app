//location search response
export interface searchResType {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}
//WEATHER RESULTS
export interface Consolidated_weather {
  id: number;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

export interface Parent {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

export interface Source {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
}

export interface weatherType {
  consolidated_weather: Consolidated_weather[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: Parent;
  sources: Source[];
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}
