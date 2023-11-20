import '../styles/global.css';

export default function App({ Component, pageProps }) {
  // add global CSS files by importing them from pages/_app.js
  return <Component {...pageProps} />;
}
