import { capitalize } from '../utils/client/filter_utils';

const BreadCrumbs = ({ handleFilterChange, selectedLabel }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex list-none p-0 text-base">
        <li
          className="flex cursor-pointer items-center text-gray-400"
          onClick={() => handleFilterChange('')}
        >
          Posts
        </li>
        <span className="mx-2">/</span>
        <li className="flex items-center text-gray-300">
          {capitalize(selectedLabel)}
        </li>
      </ol>
    </nav>
  );
};

export default function PageHeader({ handleFilterChange, selectedLabel }) {
  return (
    <header className="w-full mb-6 mt-4">
      <BreadCrumbs
        handleFilterChange={handleFilterChange}
        selectedLabel={selectedLabel}
      />
      <h1 className="font-bold text-4xl mb-4 justify-self-start">
        Posts {selectedLabel !== '' ? `- ${capitalize(selectedLabel)}` : ''}
      </h1>
      <div className="w-full border-b-2 border-black dark:border-white" />
    </header>
  );
}
