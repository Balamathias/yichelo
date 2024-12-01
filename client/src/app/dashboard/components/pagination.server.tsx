import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-between">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          Previous
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;