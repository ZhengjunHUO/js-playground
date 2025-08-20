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
        // {sub, oidc_id, email_verified, name, oidc_role, preferred_username, given_name, family_name, email}
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

  const handleProxy = () => {
    window.location.href =
      //"http://localhost/backend/proxy?url=https%3A%2F%2Fkernel.org";
      "http://localhost/backend/proxy?url=http%3A%2F%2Flocalhost%2Frusty%2Fapp";
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
      <button onClick={handleProxy}>Test proxy</button>
    </main>
  );
}
