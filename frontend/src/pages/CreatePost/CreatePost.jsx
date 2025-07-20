import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/posts', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="create-input"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="create-textarea"
        onChange={e => setForm({ ...form, content: e.target.value })}
      ></textarea>
      <button onClick={handleSubmit} className="create-button">
        Create
      </button>
    </div>
  );
};

export default CreatePost;
