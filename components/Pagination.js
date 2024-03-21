import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ totalItems, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handlers for previous and next buttons
  const handlePrevious = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    // Update the URL or fetch new data here
  };

  const handleNext = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
    // Update the URL or fetch new data here
  };

  return (
    <div className="flex w-full mt-10 items-center justify-between bg-transparent px-4 py-3 sm:px-6">
      <button
        onClick={handlePrevious}
        className="relative inline-flex items-center rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-300"
      >
        Previous
      </button>

      <div className="items-center">
        <p className="text-sm dark:text-white text-gray-700">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">{itemsPerPage}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <button
        onClick={handleNext}
        className="relative inline-flex items-center rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-300"
      >
        More
      </button>
    </div>
  );
}
