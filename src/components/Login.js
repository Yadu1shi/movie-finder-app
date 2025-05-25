import React, { useState } from 'react';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem('user'));

    if (!storedData) {
      setMessage(<p className="text-red-500">No user found. Please register first.</p>);
      return;
    }

    if (
      loginData.email === storedData.email &&
      loginData.password === storedData.password
    ) {
      setMessage(<p className="text-green-500">Login successful!</p>);
    } else {
      setMessage(<p className="text-red-500">Invalid email or password.</p>);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Login Form</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="password"
          placeholder="Enter password"
          type="password"
          style={{color:'black'}}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      {message && <div className="text-center">{message}</div>}
    </div>
  );
}

export default Login;
