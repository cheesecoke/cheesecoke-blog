import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex w-full mt-10 items-center justify-between bg-transparent px-4 py-3 sm:px-6">
      <button
        onClick={handlePrevious}
        className={`${
          currentPage <= 1
            ? 'bg-gray-900 text-gray-400 border-gray-900 opacity-50'
            : 'bg-primary hover:bg-primary-300 text-white border-primary'
        } relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium `}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      <div className="items-center">
        <p className="text-sm dark:text-white text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>{' '}
          <span className="font-medium hidden sm:inline-block">
            - {totalItems} total posts{' '}
          </span>{' '}
        </p>
      </div>
      <button
        onClick={handleNext}
        className={`${
          currentPage >= totalPages
            ? 'bg-gray-900 text-gray-400 border-gray-900 opacity-50'
            : 'bg-primary hover:bg-primary-300 text-white border-primary'
        } relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium `}
        disabled={currentPage >= totalPages}
      >
        More
      </button>
    </div>
  );
}
