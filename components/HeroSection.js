export default function HeroSection({ title }) {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-50">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 dark:text-gray-200 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Already a member?{' '}
          <a
            href="/api/auth/signin"
            className="font-semibold dark:text-gray-100 text-primary"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            Sign In <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 dark:text-gray-200 text-gray-600">
          Have you ever found yourself rampant in the vast ocean of knowledge,
          overwhelmed by the sheer expanse of what there is to learn and
          understand? You&#39;re not alone.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-primary-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 dark:text-gray-950 text-gray-900"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
