// src/pages/PostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then(res => setPost(res.data));
    axios.get(`/api/comments/${id}`).then(res => setComments(res.data));
  }, [id]);

  const addComment = async () => {
    const token = localStorage.getItem('token');
    if (!comment.trim()) return;

    const res = await axios.post(
      '/api/comments',
      { text: comment, post: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setComments([...comments, res.data]);
    setComment('');
  };

  if (!post) return <div className="post-loading">Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.content}</p>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c._id} className="comment-card">
              <strong>{c.user?.username || 'Anonymous'}:</strong> {c.text}
            </div>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment-textarea"
          placeholder="Write a comment..."
        />
        <button onClick={addComment} className="comment-button">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default PostPage;
