import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const authAction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unknown mode !" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const resp = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (resp.status === 422 || resp.status === 401) {
    return resp;
  }

  if (!resp.ok) {
    throw json({ message: "Auth failed !" }, { status: 500 });
  }

  const respData = await resp.json();
  const token = respData.token;

  localStorage.setItem("token", token);
  const expir = new Date();
  expir.setHours(expir.getHours() + 1);
  localStorage.setItem("expiration", expir.toISOString());

  return redirect("/");
};
