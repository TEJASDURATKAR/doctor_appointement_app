import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Context'; // adjust path if needed

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const signUpFromNav = location.state?.signUp || false;
  const [isSignUp, setIsSignUp] = useState(signUpFromNav);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password || (isSignUp && !name)) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        toast.success('Registered successfully!');
        console.log(data, 'Registered successfully');
        setIsSignUp(false); // switch to login
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        setToken(data.token);
        toast.success('Login successful!');
        console.log(data, 'Logged in successfully');
        navigate('/');
      }
    } catch (error) {
      console.log("Error:", error.response?.data);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-center text-gray-500 mt-1">
              {isSignUp ? 'Join us today!' : 'Log in to continue.'}
            </p>
          </div>

          {isSignUp && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>

          <p className="text-center text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => {
                setIsSignUp(!isSignUp);
                setName('');
                setEmail('');
                setPassword('');
              }}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              {isSignUp ? 'Log in here' : 'Sign up here'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
