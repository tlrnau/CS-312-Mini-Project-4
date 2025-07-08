import React, { useState } from 'react';

function BlogPostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (res.ok) {
      setMsg('Post created!');
      setTitle('');
      setContent('');
      onPostCreated(); // callback to refresh post list
    } else {
      setMsg(data.error || 'Error creating post');
    }
  };

  return (
    <div>
      <h3>Create New Blog Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default BlogPostForm;

<form onSubmit={handleSubmit} className="mb-4">
  <div className="mb-2">
    <input
      className="form-control"
      placeholder="Title"
      value={title}
      onChange={e => setTitle(e.target.value)}
      required
    />
  </div>
  <div className="mb-2">
    <textarea
      className="form-control"
      placeholder="Content"
      value={content}
      onChange={e => setContent(e.target.value)}
      required
    />
  </div>
  <button type="submit" className="btn btn-success me-2">Submit</button>
</form>