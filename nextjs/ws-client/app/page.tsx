'use client';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

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

  const handleLogout = () => {
    window.location.href =
      "http://localhost/backend/auth/logout";
  };

  const wsConn = () => {
    const s = io('http://localhost:8088', {
      withCredentials: true,
      // path: '/wsproxy/socket.io/',
      // query: { service: 'a' },
      // transports: ['websocket'],
    });

    s.on('connect', () => {
      console.log('Connected to proxy gateway');
      setConnected(true);
    });

    s.on('disconnect', () => {
      console.log('Disconnected from proxy gateway');
      setConnected(false);
    });

    s.on('proxied_message', (data: any) => {
      console.log('Received proxied message:', data);
      setMessages((prev) => [...prev, data]);
    });

    s.on('proxy_error', (err: any) => {
      console.error('Proxy error:', err);
      setMessages((prev) => [...prev, `⚠️ Proxy error: ${err.message}`]);
    });

    s.on('auth_error', (err: any) => {
      console.error('Authentication error:', err);
      setMessages((prev) => [...prev, `🚫 Authentication error: ${err.message}`]);
      setConnected(false);
    });

    setSocket(s);
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('client_message', { text: 'Hello from client!' });
    }
  };

  const wsClose = () => {
    setConnected(false);
    setMessages([]);
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      {!loggedIn ? (
        <>
          <h1>Welcome 👋</h1>
          <button
            className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h1>✅ Logged in as {user}</h1>
          <button
            className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleLogout}
          >
            Logout
          </button>
          <h1 className="text-2xl font-bold mb-2">🔌 WebSocket Proxy Client</h1>
          <p className={`mb-4 ${connected ? 'text-green-600' : 'text-red-600'}`}>
            Status: {connected ? 'Connected' : 'Disconnected'}
          </p>
          {socket ? (
          <>
            <button
              className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={sendMessage}
            >
              Send test message
            </button>
            <button
              className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={wsClose}
            >
              Close socket
            </button>

            <div className="w-full max-w-xl bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet...</p>) : (
                messages.map((msg, i) => (
                  <p key={i} className="text-sm text-gray-800 border-b border-gray-200 py-1">
                    {msg}
                  </p>
                ))
              )}
            </div>
          </>
          ) : (
            <button
              className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={wsConn}
            >
              Join web socket server
            </button>
          )}
        </>
      )}
    </div>
  );
}