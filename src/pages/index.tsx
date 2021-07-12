import { useState } from 'react';
import Main from '@/components/Main';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';

export default function Home() {
  const [isSearching, setIsSearching] = useState(true);
  const toggleSidebar = () => setIsSearching(!isSearching);
  return (
    <div className="flex flex-col bg-gray-800 font-sans md:flex-row xl:h-screen">
      {!isSearching ? (
        <Sidebar toggleSidebar={toggleSidebar} />
      ) : (
        <Search toggleSidebar={toggleSidebar} />
      )}
      <Main />
    </div>
  );
}
