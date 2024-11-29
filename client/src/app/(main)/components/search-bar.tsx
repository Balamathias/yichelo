'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useSuggestions } from '@/lib/react-query/product.query';
import { useDebounce } from '@/hooks/use-debounce';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar = () => {

  const q = useSearchParams()?.get('q') || ''

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(q);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 500);

  const { data: suggestions, isPending: suggesting } = useSuggestions(debouncedQuery)

  const filteredData = suggestions?.filter?.((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prev) =>
        prev < (filteredData?.length || 0) - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      setQuery(filteredData?.[focusedIndex] || '');
      setIsOpen(false);
      router.push(`/search/results?q=${query}`);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <motion.div
        initial={{ width: 48 }}
        animate={{ width: 400 }}
        className="flex items-center bg-secondary rounded-full shadow-none overflow-hidden transition-all duration-300"
      >
        <button
          className="p-2 focus:outline-none cursor-pointer"
          onClick={
            () => {
              setIsOpen(false)
              router.push(`/search/results?q=${query}`)
            }
          }
        >
          <Search className="text-gray-600 dark:text-gray-300" />
        </button>
        {(
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent outline-none"
          />
        )}
      </motion.div>

      {/* Dropdown */}
      {isOpen && query && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-full max-w-md bg-white dark:bg-background border border-gray-200 dark:border-gray-700 rounded-xl z-10 p-2"
        >
          {
            suggesting ? (
              <div className='flex flex-col gap-y-3'>
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className='w-full h-8' />
                ))}
              </div>
            ): (
              <>
                {filteredData?.length && filteredData?.length > 0 ? (
                  filteredData.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                        focusedIndex === index
                          ? 'bg-brand text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => {
                        setQuery(item);
                        setIsOpen(false);
                        router.push(`/search/results?q=${item}`);
                      }}
                    >
                      <Search className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No results found.
                  </li>
                )}
              </>
            )
          }
        </motion.ul>
      )}
    </div>
  );
};

export default SearchBar;
