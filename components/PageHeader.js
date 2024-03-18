const BreadCrumbs = ({ selectedLabel }) => {
  const capitalized =
    selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1);
  const breadcrumbs = [
    { path: '/allposts', label: 'All Posts' },
    { path: '#', label: capitalized },
  ];
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex list-none p-0 text-base">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === breadcrumbs.length - 1
                ? 'text-gray-500'
                : 'text-gray-600'
            }`}
          >
            {index !== 0 && <span className="mx-2">/</span>}
            <a href={breadcrumb.path} className="hover:underline">
              {breadcrumb.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default function PageHeader({ selectedLabel }) {
  return (
    <header className="w-full mb-6 mt-4">
      <BreadCrumbs selectedLabel={selectedLabel} />
      <h1 className="font-bold text-4xl mb-4 justify-self-start">All Posts</h1>
      <div className="w-full border-b-2 border-black dark:border-white" />
    </header>
  );
}
