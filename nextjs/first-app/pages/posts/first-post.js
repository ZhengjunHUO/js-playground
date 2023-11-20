import Link from 'next/link';

// The Link component enables client-side navigation between two pages in the same Next.js app.
// No routing libraries are required if create routes as files under pages and use the built-in Link component. 
export default function FirstPost() {
  return (
    <>
      <h1>This is the first post !</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
