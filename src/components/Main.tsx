import { BiNavigation } from '@/utils/icons';
import { Consolidated_weather, weatherType } from '@/types/api';
import { getDate, iconUrl } from '@/utils';
import Image from 'next/image';
import { mainPropsType, WeekPropsType } from '@/types';

const WeekDay: React.FC<WeekPropsType> = ({ date, minTemp, maxTemp, icon }) => {
  return (
    <div className="flex flex-col justify-between items-center p-4 w-32 h-44 mb-8 bg-gray-800">
      <h3 className="text-white">{date}</h3>
      <div>
        <Image src={iconUrl(icon)} width="56px" height="60px" alt="" />
      </div>
      <div className="flex justify-between w-full text-white">
        <span>{Math.round(maxTemp)}℃</span>
        <span>{Math.round(minTemp)}℃</span>
      </div>
    </div>
  );
};

const TodayWeather: React.FC<{ weather: Consolidated_weather }> = ({ weather }) => {
  return (
    <>
      <h2 className="text-white text-2xl font-sans font-bold mb-4">Today’s Hightlights </h2>
      <div className="xl:flex xl:justify-between">
        <div className="xl:flex-auto xl:mr-4">
          <div className="flex flex-col justify-around items-center py-4 px-8 w-full h-52 mb-8 bg-gray-800">
            <h3 className="text-white font-sans font-medium">Wind status</h3>
            <div className="text-white text-6xl font-sans font-bold">
              <span>{Math.round(weather.wind_speed)}</span>
              <span className="text-5xl font-medium">mph</span>
            </div>
            <div className="flex items-center text-white font-sans font-medium">
              <BiNavigation
                style={{ transform: `rotate(${weather.wind_direction - 44}deg)` }}
                size="1.5em"
              />
              <span className="ml-3">{weather.wind_direction_compass}</span>
            </div>
          </div>
          <div className="flex flex-col justify-around items-center py-4 px-8 w-full h-52 mb-8 bg-gray-800">
            <h3 className="text-white font-sans font-medium">Humidity</h3>
            <div className="text-white text-6xl font-sans font-bold">
              <span>{Math.round(weather.humidity)}</span>
              <span className="text-5xl font-medium">%</span>
            </div>
            <div className="w-full relative">
              <div className="absolute flex justify-between w-full text-white text-xs h-2 -top-4">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>

              <div className="absolute flex justify-end w-full text-white text-xs h-2 top-2">
                <span>%</span>
              </div>
              <div className="relative w-full h-2 rounded-xl bg-gray-600">
                <div
                  className="absolute h-full bg-yellow-300 rounded-xl"
                  style={{ width: `${Math.round(weather.humidity)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:flex-auto xl:ml-4">
          <div className="flex flex-col justify-around items-center py-4 px-8 w-full h-40 mb-8 bg-gray-800">
            <h3 className="text-white font-sans font-medium">Visibility</h3>
            <div className="text-white text-6xl font-sans font-bold">
              <span>{Math.round(weather.visibility)}</span>
              <span className="text-5xl font-medium">miles</span>
            </div>
          </div>
          <div className="flex flex-col justify-around items-center py-4 px-8 w-full h-40  mb-8 bg-gray-800">
            <h3 className="text-white font-sans font-medium">Air Pressure</h3>
            <div className="text-white text-6xl font-sans font-bold">
              <span>{Math.round(weather.air_pressure)}</span>
              <span className="text-5xl font-medium">mb</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Main: React.FC<mainPropsType> = ({ weather }) => {
  return (
    <div className="flex flex-col px-5 py-12 bg-gray-900 md:flex-auto xl:px-10 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between flex-wrap">
        {weather.consolidated_weather.map((c, i) => {
          if (i === 0) return;
          return (
            <WeekDay
              key={`day-${c.id}-${i}`}
              date={i === 1 ? 'Tomorrow' : getDate(c?.applicable_date)}
              maxTemp={c.max_temp}
              minTemp={c.min_temp}
              icon={c.weather_state_abbr}
            />
          );
        })}
      </div>
      <TodayWeather weather={weather.consolidated_weather[0]} />
    </div>
  );
};

export default Main;
