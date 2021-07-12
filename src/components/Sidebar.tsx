import Image from 'next/image';
import React, { useRef } from 'react';
import { BiCurrentLocation, ImLocation2 } from '@/utils/icons';
import { Consolidated_weather } from '@/types/api';
import { getDate, iconUrl } from '@/utils';
import { actionBtnPropsType, sidebarPropsType } from '@/types';

let ActionBtn: React.FC<actionBtnPropsType> = ({ toggle, loadLocalWeather }) => {
  const ping = useRef<HTMLSpanElement>(null);
  return (
    <div className="flex justify-between">
      <button
        onClick={toggle}
        className="block text-white bg-gray-600 w-40 h-10 font-sans font-medium"
      >
        Search for places
      </button>
      <button
        onClick={() => {
          ping?.current?.classList.toggle('animate-ping');
          loadLocalWeather('0').then(() => ping?.current?.classList.toggle('animate-ping'));
        }}
        className="flex justify-center items-center relative text-white bg-gray-600 h-10 w-10 rounded-full"
      >
        <BiCurrentLocation size="1.6em" />
        <span
          ref={ping}
          className="absolute block w-full h-full rounded-full border border-gray-600"
        ></span>
      </button>
    </div>
  );
};

ActionBtn = React.memo(ActionBtn, () => true);

const CurrentWeather: React.FC<{ weather: Consolidated_weather; title: string }> = ({
  weather,
  title,
}) => {
  const temp = weather?.the_temp;
  return (
    <div className="flex-auto flex flex-col items-center">
      <div className="flex-auto flex justify-center items-center pointer-events-none">
        <Image src={iconUrl(weather.weather_state_abbr)} width="150px" height="170px" alt="" />
      </div>
      <div>
        <span className="text-9xl font-sans font-medium text-white">{Math.floor(temp)}</span>
        <span className="text-5xl font-sans font-thin text-white">℃</span>
      </div>
      <div className="text-white text-3xl mt-5">{weather?.weather_state_name}</div>
      <div className="flex items-center text-white text-lg mt-7">
        <span>Today </span>
        <span className="mx-2">.</span>
        <span>{getDate(weather?.applicable_date)}</span>
      </div>
      <div className="flex items-center text-white text-lg mt-5 mb-10">
        <span className="mr-1">
          <ImLocation2 />
        </span>
        <span>{title}</span>
      </div>
    </div>
  );
};

const Sidebar: React.FC<sidebarPropsType> = ({ weather, toggle, loadLocalWeather }) => {
  return (
    <>
      <div className="absolute z-0 w-full h-full bg-cloud-bg bg-auto opacity-25 bg-top bg-no-repeat md:w-80 flex-shrink-0 lg:w-96"></div>
      <div className="flex flex-col w-full h-screen  px-2 py-3 z-10 md:w-80 lg:w-96 flex-shrink-0">
        <ActionBtn loadLocalWeather={loadLocalWeather} toggle={toggle} />
        <CurrentWeather weather={weather?.consolidated_weather[0]} title={weather?.title} />
      </div>
    </>
  );
};

export default Sidebar;
