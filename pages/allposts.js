import { useState } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { filterPostsByLabel } from '../utils/client/filter_utils.js';

import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function AllPosts({ posts, globalData }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleFilterChange = (label) => {
    setSelectedLabel(label);
    const filtered = filterPostsByLabel(posts, label);
    setFilteredPosts(filtered);
  };

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <PageHeader selectedLabel={selectedLabel} />
      <main className="flex w-full">
        <aside className="w-1/4 p-4">
          <h2 className="font-bold mb-4">Categories</h2>
          <ul>
            <li
              className="cursor-pointer"
              onClick={() => handleFilterChange('coding')}
            >
              Coding
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleFilterChange('tech')}
            >
              Tech
            </li>
          </ul>
        </aside>
        <div className="w-3/4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
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
                  <div className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {post.data.date && (
                      <p className="uppercase mb-3 font-bold opacity-60 text-sm">
                        {post.data.date}
                      </p>
                    )}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                      {post.data.title}
                    </h2>
                    {post.data.description && (
                      <p className="mt-3 text-base opacity-60">
                        {post.data.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto">
                    <ArrowIcon className="self-end mr-6 mb-6" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

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
