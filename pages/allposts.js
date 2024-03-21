import { useState } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import {
  filterPostsByLabel,
  getCategoriesByLabel,
} from '../utils/client/filter_utils.js';

import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination.js';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function AllPosts({ posts, globalData }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedLabel, setSelectedLabel] = useState('');
  const labels = getCategoriesByLabel(posts);

  const handleFilterChange = (label) => {
    setSelectedLabel(label);

    if (label === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = filterPostsByLabel(posts, label);
      setFilteredPosts(filtered);
    }
  };

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <main className="flex w-full">
        <aside className="h-min sm:block hidden sm:w-1/4 mt-4 mr-4 p-4 rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 transition-all border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10">
          <h2 className="font-bold mb-4">Categories</h2>
          <ul role="list" className="divide-y divide-gray-100 cursor-pointer">
            {labels.map((category) => (
              <li
                key={category}
                className="flex justify-between gap-x-6 py-5 text-black dark:text-white"
                onClick={() => handleFilterChange(category)}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6">
                      {category}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <div className="w-full sm:w-3/4">
          <PageHeader
            handleFilterChange={handleFilterChange}
            selectedLabel={selectedLabel}
          />
          <ul className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {filteredPosts.map((post) => (
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

      <Pagination totalItems={posts.length} />
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
