import { useEffect } from "react";

export default function useInfiniteScroll({ fetchNextPage, hasNextPage }: {fetchNextPage: () => any, hasNextPage: boolean}) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage]);
}