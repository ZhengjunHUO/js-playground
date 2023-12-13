import React from "react";

export const UsersContext = React.createContext({
  users: [
    { id: "u1", name: "Foo" },
    { id: "u2", name: "Bar" },
    { id: "u3", name: "Baz" },
  ],
});
