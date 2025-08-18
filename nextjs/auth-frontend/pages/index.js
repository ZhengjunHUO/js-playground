import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check session on load
  useEffect(() => {
    fetch("http://localhost/backend/auth/whoami", {
      credentials: "include", // send cookies (connect.sid)
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        setLoggedIn(true);
        setUser(data.name);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  const handleLogin = () => {
    window.location.href =
      "http://localhost/backend/auth/login?redirect_uri=http://localhost/";
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      {!loggedIn ? (
        <>
          <h1>Welcome 👋</h1>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h1>✅ Logged in as {user}</h1>
        </>
      )}
    </main>
  );
}
