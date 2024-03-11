import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../../Hook/AuthContext';

function Login() {
  const naviage = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-3 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                fillRule="evenodd"
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              type="text"
              id="email"
              className="w-full focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-3 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              id="password"
              className="w-full focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <Link to="/forgot-password" className="text-sm text-red-600 hover:text-gray-800">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-sm text-gray-600 hover:text-gray-800">
            Sign Up
          </Link>
        </div>
        <button onClick={() =>  {
          setIsLoggedIn(true)
          naviage("/")
        }} className="btn w-full bg-red-500 text-white hover:bg-red-600" type="submit">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
