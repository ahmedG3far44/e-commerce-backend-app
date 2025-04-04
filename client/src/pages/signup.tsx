/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { register } from "../utils/handlers";
import { Navigate } from "react-router-dom";
import useAuth from "../context/auth/AuthContext";

interface UserRegisterInputsType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function SignUpPage() {
  const { isAuthenticated, logUser } = useAuth();

  const [userRegister, setUserRegister] = useState<UserRegisterInputsType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const data = await register(userRegister);
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
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold">Register a new User</h1>
        <input
          onChange={handleChange}
          value={userRegister.firstName}
          type="text"
          name="firstName"
          placeholder="Your First Name"
          id="firstName"
          className="p-2 border rounded-md border-blue-200 bg-gray-50 w-full"
          required
          readOnly={pending}
        />
        <input
          onChange={handleChange}
          value={userRegister.lastName}
          type="text"
          name="lastName"
          placeholder="Your Last Name"
          id="lastName"
          className="p-2 border rounded-md border-blue-200 bg-gray-50 w-full"
          required
          readOnly={pending}
        />
        <input
          onChange={handleChange}
          value={userRegister.email}
          type="text"
          name="email"
          placeholder="email"
          id="email"
          className="p-2 border rounded-md border-blue-200 bg-gray-50 w-full"
          required
          readOnly={pending}
        />
        <input
          onChange={handleChange}
          value={userRegister.password}
          placeholder="password"
          type="password"
          name="password"
          id="password"
          className="p-2 border rounded-md border-blue-200 bg-gray-50 w-full"
          required
          readOnly={pending}
        />
        {error && (
          <div className="w-full p-4 text-start bg-rose-200 border-rose-500 rounded-md  text-sm text-rose-500">
            <p>{error}</p>
          </div>
        )}
        <input
          className="w-full disabled:bg-gray-300 p-2 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-700 mt-4"
          type="submit"
          value={pending ? "loading..." : "Create New Account"}
          disabled={pending}
        />
      </form>
    </div>
  );
}

export default SignUpPage;
