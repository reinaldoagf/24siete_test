import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../redux/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, status  } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

   // Redirige cuando el token esté disponible y la autenticación sea exitosa
   useEffect(() => {
    if (token && status === 'succeeded') {
      navigate('/dashboard', { replace: true });
    }
  }, [token, status, navigate]);

  return (
    <div className="bg-gray-200 font-sans text-gray-700 h-screen flex items-center">
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">24siete test</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form
                className="py-2"
                onSubmit={handleSubmit}
              >
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  type="submit"
                  disabled={loading}
                >
                  {" "}
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              {error && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Error!</span> {error}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                <Link to={'/signup'} className="font-medium text-indigo-500">
                    Crear cuenta
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
