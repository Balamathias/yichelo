import { useEffect } from "react";
import { throttle } from "lodash";

export default function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
}: {
  fetchNextPage: () => any;
  hasNextPage: boolean;
}) {
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasNextPage) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);
}
