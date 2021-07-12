import { searchResType, weatherType } from '@/types/api';
import { useEffect, useState } from 'react';

export const getLocation = (): Promise<{ latt: number; long: number }> => {
  return new Promise((resolve, reject) => {
    try {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          if (position)
            resolve({ latt: position.coords.latitude, long: position.coords.longitude });
        },
        (error) => {
          if (error) reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const iconUrl = (abb: string) =>
  `https://www.metaweather.com/static/img/weather/${abb}.svg`;

export const baseUrl = 'https://www.metaweather.com/api/location/';

const getLocalWeather = async () => {
  const { latt, long } = await getLocation().catch(() => ({ latt: '', long: '' }));
  return await fetch(`/api/weather?latt=${latt}&long=${long}`).then((res) => res.json());
};

const getWeather = async (latt: string, long: string) => {
  return await fetch(`/api/weather?latt=${latt}&long=${long}`).then((res) => res.json());
};

export const getDate = (date: string) => {
  return new Date(date).toDateString().split(' ').slice(0, 3).join(' ');
};

/**
 * COSTUME HOOKS
 */

export const useWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<weatherType | null>(null);

  const loadLocalWeather = async (c: '0' | '1') => {
    if (c === '1') setIsLoading(true);
    return await getLocalWeather()
      .then((w) => {
        setWeather(w);
        setIsLoading(false);
        return 0;
      })
      .catch((e) => {
        setIsLoading(false);
        return 0;
      });
  };

  const loadWeather = async (latt: string, long: string, c: '0' | '1') => {
    if (c === '1') setIsLoading(true);
    return await getWeather(latt, long)
      .then((w) => {
        setWeather(w);
        setIsLoading(false);
        return 0;
      })
      .catch((e) => {
        setIsLoading(false);
        return 0;
      });
  };

  useEffect(() => {
    loadLocalWeather('0');
  }, []);

  return { weather, isLoading, loadLocalWeather, loadWeather };
};

export const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  return { isToggled, toggle };
};

export const useSearch = (url: string) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<searchResType[]>([]);

  const search = async (query: string) => {
    setIsSearching(true);
    const results = await fetch(`${url}?q=${query}`).then((res) => res.json());
    setSearchResults(results);
    setIsSearching(false);
  };
  return { searchResults, isSearching, search };
};
