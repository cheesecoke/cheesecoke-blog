import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ChevronDown from '../components/ChevronDown';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  const currentPosts = posts.slice(0, 6);
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <main className="w-full">
        <HeroSection title={globalData.blogTitle} />
        <div className="flex mx-auto max-w-2xl lg:justify-center mb-10">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Start Reading
          </h2>
          <ChevronDown className="w-6 h-6 mt-1 ml-4" />
        </div>
        <ul className="w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
          {currentPosts.map((post) => (
            <li
              key={post.filePath}
              className="rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition-all border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:border-opacity-100"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <div className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="line-clamp-3 mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/allposts"
          className="flex w-full lg:justify-center pt-10 text-lg font-semibold leading-6 dark:text-gray-950 text-gray-900"
        >
          All posts <span aria-hidden="true">→</span>
        </Link>
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
