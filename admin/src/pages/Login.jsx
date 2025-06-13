import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('admin');
  const { setAToken, backendUrl } = useContext(AdminContext); // ✅ FIXED variable name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        state === 'admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const response = await axios.post(url, { email, password });

      const token = response.data.token;
      localStorage.setItem('aToken', token);
      setAToken(token);

      toast.success(`${state.charAt(0).toUpperCase() + state.slice(1)} logged in successfully`);
      console.log('Token:', token);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      toast.error(errMsg);
      console.error('Login failed:', errMsg);
    }
  };

  const toggleRole = () => {
    setState((prev) => (prev === 'admin' ? 'doctor' : 'admin'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center capitalize">
          <span>{state}</span> Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          {state === 'admin' ? (
            <p>
              Doctor Login?{' '}
              <span
                onClick={toggleRole}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{' '}
              <span
                onClick={toggleRole}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
