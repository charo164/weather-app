import Head from 'next/head';
import { ImLocation2 } from '@/utils/icons';
import Main from '@/components/Main';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import Loader from '@/components/Loader';
import { useToggle, useWeather } from '@/utils';
import { loadLocalWeatherType } from '@/types';

const Error: React.FC<{ loadLocalWeather: loadLocalWeatherType }> = ({ loadLocalWeather }) => {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <h1 className="text-red-300 text-lg mb-4 font-sans">Error !</h1>
      <button
        onClick={() => loadLocalWeather('1')}
        className="block text-white bg-gray-600 px-4 py-2 font-sans font-medium"
      >
        Try again
      </button>
    </div>
  );
};

export default function Home() {
  const { isToggled, toggle } = useToggle();
  const { weather, isLoading, loadLocalWeather, loadWeather } = useWeather();

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <div className="flex flex-col font-sans md:flex-row xl:h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center flex-col w-full h-screen">
            <h1 className="flex items-center text-gray-200 text-lg mb-2 font-sans">
              <ImLocation2 />
              <span className="ml-1">Geolocation...</span>
            </h1>
            <Loader size="80" color="blue" />
          </div>
        ) : weather ? (
          <>
            {!isToggled ? (
              <Sidebar weather={weather} loadLocalWeather={loadLocalWeather} toggle={toggle} />
            ) : (
              <Search toggle={toggle} loadWeather={loadWeather} />
            )}
            <Main weather={weather} />
          </>
        ) : (
          <Error loadLocalWeather={loadLocalWeather} />
        )}
      </div>
    </>
  );
}
