import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Importing icons
import useAuthStatus from "../../Hooks/useAuthStatus";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('access_token', responseData.token.access);
        localStorage.setItem('refresh_token', responseData.token.refresh);
  
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', true);
        navigate("/");
        window.location.reload();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
        <h3 className="text-3xl font-semibold text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input type="email" id="email" className="input w-full" placeholder="Enter Your Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" className="input w-full" placeholder="Enter Your Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
              type="button"
              className="absolute top-6 inset-y-0 right-0 px-3 py-2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>
          <button type="submit" className="btn bg-red-500 hover:bg-red-400 text-white w-full">Login</button>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/register" className="ml-1 text-red-500">Create a new account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
