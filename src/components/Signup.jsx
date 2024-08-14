import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {

  const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Reset error message

      try {
          const response = await axios.post('/api/v1/users/register', {
              username,
              name,
              password
          });

          if (response.status === 201) {
              alert("User registered successfully!");
              window.location.href = '/login';
          }
      } catch (err) {
          if (err.response && err.response.data) {
              setError(err.response.data.message || "username already exist");
          } else {
              setError("Something went wrong, please try again.");
          }
      }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${error ? 'bg-red-50' : 'bg-white'}`}>
            <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Already have an account? <a href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">Login</a>
                </p>
            </div>
        </div>
  )
}
