import React, { useState } from 'react';

function Signin({ setUser }) {
  const [form, setForm] = useState({ user_id: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      setMsg('Login successful');
      setUser(data.user); // store logged in user
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default Signin;

<form className="mb-3" onSubmit={handleSubmit}>
  <div className="mb-2">
    <input className="form-control" name="user_id" placeholder="User ID" onChange={handleChange} required />
  </div>
  <div className="mb-2">
    <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
  </div>
  <div className="mb-2">
    <input className="form-control" name="name" placeholder="Full Name" onChange={handleChange} required />
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>