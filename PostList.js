import React, { useEffect, useState } from 'react';

function PostList({ user, reload, onEdit, onDelete }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts', err));
  }, [reload]);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.map(post => (
        <div key={post.blog_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><i>By {post.creator_name} on {new Date(post.date_created).toLocaleString()}</i></p>

          {user && user.user_id === post.creator_user_id && (
            <>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post.blog_id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
{user && user.user_id === post.creator_user_id && (
  <>
    <button onClick={() => onEdit(post)}>Edit</button>
    <button onClick={() => onDelete(post.blog_id)}>Delete</button>
  </>
)}

export default PostList;

<div className="card mb-3" key={post.blog_id}>
  <div className="card-body">
    <h5 className="card-title">{post.title}</h5>
    <p className="card-text">{post.body}</p>
    <p className="card-subtitle text-muted">
      By {post.creator_name} on {new Date(post.date_created).toLocaleString()}
    </p>
    {user && user.user_id === post.creator_user_id && (
      <div className="mt-2">
        <button className="btn btn-warning me-2" onClick={() => onEdit(post)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(post.blog_id)}>Delete</button>
      </div>
    )}
  </div>
</div>