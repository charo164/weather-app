import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineRight } from 'react-icons/ai';

interface searchPropsType {
  toggleSidebar: () => void;
}

const Search: React.FC<searchPropsType> = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col w-full h-screen px-4 md:w-80 lg:w-96">
      <div className="flex justify-end py-4">
        <button onClick={toggleSidebar} className="text-white">
          <IoCloseSharp size="1.5em" />
        </button>
      </div>
      <form className="flex w-full pb-4">
        <div className="flex-auto">
          <input
            className="block border border-white bg-transparent text-white pl-3 w-full h-full"
            type="search"
            placeholder="search location"
          />
        </div>
        <div>
          <button
            className="block px-4 py-3 bg-blue-700 text-white font-sans font-bold ml-2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex-auto">
        <div className="flex justify-between items-center w-full h-16 mt-4 px-3 border border-transparent hover:border-gray-300 cursor-pointer">
          <span className="text-white font-sans font-medium">London</span>
          <span className="text-white">
            <AiOutlineRight />
          </span>
        </div>
        <div className="flex justify-between items-center w-full h-16 mt-4 px-3 border border-transparent hover:border-gray-300 cursor-pointer">
          <span className="text-white font-sans font-medium">London</span>
          <span className="text-white">
            <AiOutlineRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
