import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/Home/HomePage';
import PostPage from './pages/PostPage/PostPage';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';
import Layout from './components/Layout/Layout';

// 🔐 Protected Route
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <LoginPage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path="/post/:id" element={<Layout><PostPage /></Layout>} />
        <Route path="/create" element={<Layout><ProtectedRoute><CreatePost /></ProtectedRoute></Layout>} />
        <Route path="/edit/:id" element={<Layout><ProtectedRoute><EditPost /></ProtectedRoute></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
