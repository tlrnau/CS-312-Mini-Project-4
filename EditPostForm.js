import React, { useState } from 'react';

function EditPostForm({ post, onCancel, onUpdated }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/blogs/${post.blog_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (res.ok) {
      setMsg('Post updated!');
      onUpdated();
    } else {
      setMsg(data.error || 'Failed to update');
    }
  };

  return (
    <div>
      <h3>Edit Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default EditPostForm;

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