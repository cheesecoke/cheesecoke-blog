import { useState } from 'react';
import ChevronDown from './ChevronDown';

export default function Accordion({
  title,
  items,
  handleSelection,
  selectedFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'border-b' : ''} overflow-hidden`}>
      <button
        className="w-full flex justify-between border-b text-left py-2 dark:text-white text-base font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="p-4">
          <ul>
            {items.map((item, index) => (
              <li key={index} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  className="mr-2"
                  checked={selectedFilters.includes(item)}
                  onChange={() => handleSelection(item)}
                />
                <label htmlFor={`checkbox-${index}`}>{item}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
