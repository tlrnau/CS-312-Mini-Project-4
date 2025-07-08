import React, { useEffect, useState } from 'react';

function FetchTest() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs', {
      credentials: 'include' // important for session cookies
    })
      .then(res => res.json())
      .then(data => {
        console.log('Received data:', data);
        setPosts(data);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  }, []);

  return (
    <div>
      <h2>Fetched Blog Posts</h2>
      {posts.length === 0 ? (
        <p>Loading or no posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.blog_id} style={{ marginBottom: '20px' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>By {post.creator_name} on {new Date(post.date_created).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default FetchTest;
function FetchTest({ reload }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [reload]); // reload dependency triggers refresh

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.map(post => (
        <div key={post.blog_id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <p><i>By {post.creator_name} on {new Date(post.date_created).toLocaleString()}</i></p>
          <hr />
        </div>
      ))}
    </div>
  );
}