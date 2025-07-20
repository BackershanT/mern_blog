// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Latest Blog Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-snippet">{post.content.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
