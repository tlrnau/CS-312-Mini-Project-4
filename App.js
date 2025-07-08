import React from 'react';
import FetchTest from './components/FetchTest';

function App() {
  return (
    <div className="App">
      <h1>Blog Frontend (React)</h1>
      <FetchTest />
    </div>
  );
}

import React, { useState } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import FetchTest from './components/FetchTest';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>React Blog App</h1>
      {!user ? (
        <>
          <Signup />
          <Signin setUser={setUser} />
        </>
      ) : (
        <>
          <h3>Welcome, {user.name}!</h3>
          <FetchTest />
        </>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import FetchTest from './components/FetchTest';

function App() {
  const [user, setUser] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);

  const refreshPosts = () => setReloadPosts(!reloadPosts);

  return (
    <div className="App">
      <h1>React Blog App</h1>
      {!user ? (
        <>
          <Signup />
          <Signin setUser={setUser} />
        </>
      ) : (
        <>
          <h3>Welcome, {user.name}!</h3>
          <BlogPostForm onPostCreated={refreshPosts} />
          <FetchTest reload={reloadPosts} />
        </>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import PostList from './components/PostList';

function App() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  const refreshPosts = () => setReload(!reload);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) refreshPosts();
    else alert('Failed to delete post');
  };

  const handleEdit = (post) => {
    // You’ll implement this in Step 7
    alert(`Editing post: ${post.title}`);
  };

  return (
    <div className="App">
      <h1>React Blog App</h1>
      {!user ? (
        <>
          <Signup />
          <Signin setUser={setUser} />
        </>
      ) : (
        <>
          <h3>Welcome, {user.name}!</h3>
          <BlogPostForm onPostCreated={refreshPosts} />
          <PostList
            user={user}
            reload={reload}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import PostList from './components/PostList';
import EditPostForm from './components/EditPostForm';

function App() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const refreshPosts = () => setReload(!reload);
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) refreshPosts();
    else alert('Failed to delete post');
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleUpdate = () => {
    setEditingPost(null);
    refreshPosts();
  };

  return (
    <div className="App">
      <h1>React Blog App</h1>
      {!user ? (
        <>
          <Signup />
          <Signin setUser={setUser} />
        </>
      ) : (
        <>
          <h3>Welcome, {user.name}!</h3>
          {editingPost ? (
            <EditPostForm post={editingPost} onCancel={handleCancelEdit} onUpdated={handleUpdate} />
          ) : (
            <BlogPostForm onPostCreated={refreshPosts} />
          )}
          <PostList
            user={user}
            reload={reload}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this post?");
  if (!confirm) return;

  const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (res.ok) {
    refreshPosts();
  } else {
    alert('Failed to delete post');
  }
};

export default App;