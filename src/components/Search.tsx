import { IoCloseSharp, AiOutlineRight } from '@/utils/icons';
import Loader from './Loader';
import { useSearch } from '@/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { searchPropsType, toggleType } from '@/types';
import { searchResType } from '@/types/api';

interface ItemPropsType {
  item: searchResType;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadWeather: (latt: string, long: string, c: '0' | '1') => Promise<number>;
  toggle: toggleType;
}

const Item: React.FC<ItemPropsType> = ({ item, setLoading, loadWeather, toggle }) => {
  const [latt, long] = item.latt_long.split(',');
  return (
    <div
      onClick={() => {
        setLoading(true);
        loadWeather(latt, long, '0').then(() => toggle());
      }}
      className="flex justify-between items-center w-full h-16 mt-4 px-3 border border-transparent hover:border-gray-300 cursor-pointer"
    >
      <span className="text-white font-sans font-medium">{item?.title}</span>
      <span className="text-white">
        <AiOutlineRight />
      </span>
    </div>
  );
};

const Form: React.FC<{ search: (query: string) => Promise<void> }> = ({ search }) => {
  return (
    <form className="flex w-full pb-6">
      <div className="flex-auto">
        <input
          className="block border border-white bg-transparent text-white pl-3 w-full h-full"
          type="search"
          autoFocus
          placeholder="search location"
          onChange={(e) => search(e.target.value)}
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
  );
};

const Search: React.FC<searchPropsType> = ({ toggle, loadWeather }) => {
  const { isSearching, searchResults, search } = useSearch('/api/search');
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col flex-shrink-0 w-full h-screen px-4 md:w-80 lg:w-96">
      <div className="flex justify-end py-4 relative w-full">
        <div className="flex  absolute left-0 w-full">
          {loading && <Loader size="30" color="blue" />}
        </div>
        <button onClick={toggle} className="text-white">
          <IoCloseSharp size="1.5em" />
        </button>
      </div>
      <Form search={search} />
      <div className="flex-auto overflow-y-auto overflow-x-hidden">
        {!isSearching ? (
          <>
            {searchResults.length ? (
              <>
                {searchResults.map((item, i) => (
                  <Item
                    key={`search-item-${i}`}
                    item={item}
                    loadWeather={loadWeather}
                    toggle={toggle}
                    setLoading={setLoading}
                  />
                ))}
              </>
            ) : (
              <h2 className="text-gray-200 text-lg text-center font-sans">No results</h2>
            )}
          </>
        ) : (
          <div className="flex items-center flex-col w-full px-3">
            <h1 className="flex items-center text-gray-200 text-lg mb-2 font-sans">
              <span className="ml-1">Searching...</span>
            </h1>
            <Loader size="50" color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
