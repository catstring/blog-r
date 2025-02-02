import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook
import { createPost } from '../api'; // Import the createPost function

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use the useTheme hook

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(title, content, tags.split(',').map(tag => tag.trim()));
      navigate('/admin-blog-posts');
    } catch (err: any) {
      setError(err.response?.data.detail || 'Creation failed');
    }
  };

  return (
    <div className={`flex justify-center p-8 ${theme === 'dark' ? 'bg-stone-900' : 'bg-white'}`}>
      <div className={`relative max-w-3xl w-full p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-stone-800 text-stone-100' : 'bg-gray-100 text-black'}`}>
        <Link to="/admin-blog-posts" className="absolute top-4 right-4 text-red-500">
          <i className="fa-solid fa-circle-arrow-left"></i>
        </Link>
        <h1 className="text-2xl mb-4">Create Post</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleCreatePost}>
          <label className="flex flex-col">
            Title
            <input
              className={`border p-2 ${theme === 'dark' ? 'bg-stone-700 text-white border-stone-600' : 'bg-white text-black border-gray-300'}`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col flex-grow">
            Content
            <textarea
              className={`border p-2 flex-grow ${theme === 'dark' ? 'bg-stone-700 text-white border-stone-600' : 'bg-white text-black border-gray-300'}`}
              style={{ minHeight: '30vh' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            Tags
            <input
              className={`border p-2 ${theme === 'dark' ? 'bg-stone-700 text-white border-stone-600' : 'bg-white text-black border-gray-300'}`}
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </label>
          <button className="rounded bg-blue-500 text-white py-2 px-4 mt-4 self-end" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
