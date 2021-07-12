import { BiCurrentLocation } from 'react-icons/bi';
import { ImLocation2 } from 'react-icons/im';
import Image from 'next/image';

interface actionBtnPropsType {
  toggleSidebar: () => void;
}

const ActionBtn: React.FC<actionBtnPropsType> = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={toggleSidebar}
        className="block text-white bg-gray-400 w-40 h-10 font-sans font-medium"
      >
        Search for places
      </button>
      <button className="flex justify-center items-center text-white bg-gray-400 h-10 w-10 rounded-full">
        <BiCurrentLocation size="1.6em" />
      </button>
    </div>
  );
};

const CurrentWeather = () => {
  return (
    <div className="flex-auto flex flex-col items-center">
      <div className="flex-auto flex justify-center items-center pointer-events-none">
        <Image src="/Shower.png" width="150px" height="170px" alt="" />
      </div>
      <div>
        <span className="text-9xl font-sans font-medium text-white">15</span>
        <span className="text-5xl font-sans font-thin text-white">℃</span>
      </div>
      <div className="text-white text-3xl mt-5">Shower</div>
      <div className="flex items-center text-white text-lg mt-7">
        <span>Today </span>
        <span className="mx-2">.</span>
        <span>Fri, 5 Jun</span>
      </div>
      <div className="flex items-center text-white text-lg my-5">
        <span className="mr-1">
          <ImLocation2 />
        </span>
        <span>Helsinki</span>
      </div>
    </div>
  );
};

interface sidebarPropsType {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<sidebarPropsType> = ({ toggleSidebar }) => {
  return (
    <>
      <div className="absolute z-0 w-full h-full bg-cloud-bg bg-auto opacity-25 bg-top bg-no-repeat md:w-80 lg:w-96"></div>
      <div className="flex flex-col w-full h-screen  px-2 py-3 z-10 md:w-80 lg:w-96">
        <ActionBtn toggleSidebar={toggleSidebar} />
        <CurrentWeather />
      </div>
    </>
  );
};

export default Sidebar;
