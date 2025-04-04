/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "../utils/handlers";
import { Navigate } from "react-router-dom";
import useAuth from "../context/auth/AuthContext";
import { loginUserParams } from "../utils/types";

function LoginPage() {
  const { isAuthenticated, logUser } = useAuth();

  const [userLogin, setUserLogin] = useState<loginUserParams>({
    email: "",
    password: "",
  });
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const data = await login(userLogin);
      console.log(data);
      const { user, token } = data;

      logUser({ user, token });

      return <Navigate to="/profile" replace />;
    } catch (err: any) {
      setError(err?.message);
      return;
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-blue-500/30 flex justify-center items-center w-screen min-h-screen">
      <form
        className="w-[400px] flex flex-col justify-center items-center gap-4 bg-zinc-100 border border-zinc-300 p-4 rounded-md shadow-md "
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold">Login To Your Account</h1>
        <input
          onChange={handleChange}
          value={userLogin.email}
          type="text"
          name="email"
          placeholder="email"
          id="email"
          className="p-2  rounded-md border border-blue-200  bg-zinc-50 w-full"
          required
          readOnly={pending}
        />
        <input
          onChange={handleChange}
          value={userLogin.password}
          placeholder="password"
          type="password"
          name="password"
          id="password"
          className="p-2  rounded-md border border-blue-200  bg-zinc-50 w-full"
          required
          readOnly={pending}
        />
        {error && (
          <div className="w-full p-4 text-start bg-rose-200 border-rose-500 rounded-md  text-sm text-rose-500">
            <p>{error}</p>
          </div>
        )}

        <input
          className="w-full disabled:bg-gray-300 p-2 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-700 mt-8"
          type="submit"
          value={pending ? "loading..." : "login"}
          disabled={pending}
        />
      </form>
    </div>
  );
}

export default LoginPage;
