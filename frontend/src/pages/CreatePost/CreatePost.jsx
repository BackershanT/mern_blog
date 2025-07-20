// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import './CreatePost.css';

// // const CreatePost = () => {
// //   const [form, setForm] = useState({ title: '', content: '' });
  
// //   const navigate = useNavigate();

// //   const handleSubmit = async () => {
// //     const token = localStorage.getItem('token');
// //     try {
// //       await axios.post('/api/posts', form, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       navigate('/');
// //     } catch (error) {
// //       console.error('Post creation failed:', error);
// //     }
// //   };

// //   return (
// //     <div className="create-container">
// //       <h2 className="create-title">Create Post</h2>
// //       <input
// //         type="text"
// //         placeholder="Title"
// //         className="create-input"
// //         onChange={e => setForm({ ...form, title: e.target.value })}
// //       />
// //       <textarea
// //         placeholder="Content"
// //         className="create-textarea"
// //         onChange={e => setForm({ ...form, content: e.target.value })}
// //       ></textarea>
// //       <button onClick={handleSubmit} className="create-button">
// //         Create
// //       </button>
// //     </div>
// //   );
// // };

// // export default CreatePost;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './CreatePost.css';

// const CreatePost = () => {
  
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//     const [image, setImage] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setError('');
//     if (!title || !content) {
//       setError('Please fill in both title and content');
//       return;
//     }

//     const token = localStorage.getItem('token');
//       const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) formData.append('image', image);


//     try {
//       await axios.post(
//         '/api/posts', formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       navigate('/');
//     } catch (err) {
//       console.error('Post creation failed:', err);
//       setError('Failed to create post. Try again.');
//     }
//   };

//   return (
//     <div className="create-container">
//       <h2 className="create-title">Create Post</h2>
//       {error && <p className="create-error">{error}</p>}
//        <input
//         type="file"
//         accept="image/*"
//         className="create-input"
//         onChange={e => setImage(e.target.files[0])}
//       />
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         className="create-input"
//         onChange={e => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Content"
//         value={content}
//         className="create-textarea"
//         onChange={e => setContent(e.target.value)}
//       ></textarea>
//       <button onClick={handleSubmit} className="create-button">
//         Post
//       </button>
//     </div>
//   );
// };

// export default CreatePost;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null); // for image preview
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!title || !content) {
      setError('Please fill in both title and content.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT manually set Content-Type for FormData — let browser handle it
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Post creation failed:', err);
      setError('Failed to create post. Try again.');
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Create Post</h2>

      {error && <p className="create-error">{error}</p>}

      <input
        type="file"
        accept="image/*"
        className="create-input"
        onChange={handleImageChange}
      />

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        className="create-input"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        className="create-textarea"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button onClick={handleSubmit} className="create-button">
        Post
      </button>
    </div>
  );
};

export default CreatePost;
