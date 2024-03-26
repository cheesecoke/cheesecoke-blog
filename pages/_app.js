import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { THEME } from '../tailwind.config.js';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <span className={`theme-${THEME}`} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
