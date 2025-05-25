// Register.js
import React, { useState } from 'react';

function Register() {
  const [userdata, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const isValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const ispassvalid = (password) => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return validPassword.test(password);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = userdata;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are mandatory');
    } else if (!isValid(email)) {
      setError('Invalid email');
    } else if (!ispassvalid(password)) {
      setError(
        'Password must be at least 8 characters long and include a letter, number, and symbol'
      );
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');}
      
    else  {
      // Save to local storage
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      setError('Successfully registered!');
      alert('successfully registered!')
      setUserdata({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-semibold mb-4">Register</h3>
      <form onSubmit={handleForm} className="flex flex-col gap-3 w-full max-w-sm">
        <input
          className="p-2 border rounded"
          name="name"
          placeholder="Enter your name"
          value={userdata.name}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded"
          name="email"
          placeholder="Enter your email"
          value={userdata.email}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={userdata.password}
          style={{color:'black'}}
          onChange={handleChange}
          />
        <input
          className="p-2 border rounded"
          name="confirmPassword"
          type="password"
          style={{color:'black'}}
          placeholder="Confirm your password"
          value={userdata.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
