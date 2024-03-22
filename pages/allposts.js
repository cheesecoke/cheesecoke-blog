import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { getDataByKey } from '../utils/client/filter_utils.js';

import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination.js';
import AccordionFilter from '../components/AccordionFilter.js';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function AllPosts({ posts, globalData }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const labels = getDataByKey(posts, 'labels');
  const authors = getDataByKey(posts, 'author');
  const perPage = 10;
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleLabelChange = (label) => {
    setSelectedLabels((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(label)) {
        return prevSelectedFilters.filter(
          (selectedLabel) => selectedLabel !== label
        );
      } else {
        return [...prevSelectedFilters, label];
      }
    });
  };

  const handleAuthorsChange = (author) => {
    setSelectedAuthors((prevSelectedAuthors) => {
      if (prevSelectedAuthors.includes(author)) {
        return prevSelectedAuthors.filter(
          (selectedAuthor) => selectedAuthor !== author
        );
      } else {
        return [...prevSelectedAuthors, author];
      }
    });
  };

  useEffect(() => {
    const filtered = posts.filter((post) => {
      const labelsMatch =
        selectedLabels.length === 0 ||
        selectedLabels.every((filter) => post.data.labels?.includes(filter));
      const authorsMatch =
        selectedAuthors.length === 0 ||
        selectedAuthors.every((author) => post.data.author?.includes(author));

      return labelsMatch && authorsMatch;
    });

    setFilteredPosts(filtered);
  }, [selectedLabels, selectedAuthors, posts]); // Make sure to include selectedAuthors in the dependency array

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <main className="flex w-full">
        <aside className="h-min w-full sm:block hidden sm:w-1/4 mt-4 mr-4 p-4 rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 transition-all border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10">
          <h2 className="font-bold mb-4 text-2xl">Filters</h2>
          <AccordionFilter
            title="Labels"
            items={labels}
            selectedFilters={selectedLabels}
            handleSelection={(label) => handleLabelChange(label)}
          />
          <AccordionFilter
            title="Authors"
            items={authors}
            selectedFilters={selectedAuthors}
            handleSelection={(author) => handleAuthorsChange(author)}
          />
        </aside>
        <div className="w-full sm:w-3/4">
          <PageHeader handleLabelChange={handleLabelChange} />
          <ul className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {currentPosts.map((post) => (
              <li
                key={post.filePath}
                className="rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition-all border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:border-opacity-100"
              >
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  href={`/posts/[slug]`}
                  className="flex flex-col h-full"
                >
                  <div className="py-6 px-6 block focus:outline-none focus:ring-4">
                    {post.data.date && (
                      <p className="uppercase mb-3 font-bold opacity-60 text-sm">
                        {post.data.date}
                      </p>
                    )}
                    <h3 className="text-xl md:text-xl lg:text-2xl font-bold">
                      {post.data.title}
                    </h3>
                    {post.data.description && (
                      <p className="line-clamp-3 mt-3 text-base opacity-60">
                        {post.data.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-6 mt-auto">
                    <ArrowIcon className="self-end mr-6 mb-6" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Pagination
        totalItems={filteredPosts.length}
        itemsPerPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
