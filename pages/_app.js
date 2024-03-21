import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { THEME } from '../tailwind.config.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className={`theme-${THEME}`} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
