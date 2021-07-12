import { weatherType } from './api';

export type loadLocalWeatherType = (c: '0' | '1') => Promise<number>;

export type toggleType = () => void;

export interface sidebarPropsType {
  toggle: toggleType;
  weather: weatherType;
  loadLocalWeather: loadLocalWeatherType;
}

export interface searchPropsType {
  toggle: toggleType;
  loadWeather: (latt: string, long: string, c: '0' | '1') => Promise<number>;
}
export interface actionBtnPropsType {
  toggle: toggleType;
  loadLocalWeather: loadLocalWeatherType;
}
export interface WeekPropsType {
  date: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

export interface mainPropsType {
  weather: weatherType;
}
