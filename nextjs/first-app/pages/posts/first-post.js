import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '../../components/layout';

// The Link component enables client-side navigation between two pages in the same Next.js app.
// No routing libraries are required if create routes as files under pages and use the built-in Link component. 
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Hello Nextjs</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded, window.FB has been populated`)
        }
      />
      <h1>This is the first post !</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
}
