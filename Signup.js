import React, { useState } from 'react';

function Signup() {
  const [form, setForm] = useState({ user_id: '', password: '', name: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default Signup;

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