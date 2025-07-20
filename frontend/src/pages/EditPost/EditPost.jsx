import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Post</h2>
      <input
        type="text"
        value={form.title}
        className="edit-input"
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        value={form.content}
        className="edit-textarea"
        placeholder="Content"
        onChange={e => setForm({ ...form, content: e.target.value })}
      ></textarea>
      <button onClick={handleUpdate} className="edit-button">Update</button>
    </div>
  );
};

export default EditPost;
