// /client/src/components/CreateBookForm.jsx
import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install 'axios'

function CreateBookForm() {
  const [bookData, setBookData] = useState({ title: '', author: '', year: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      // Note: The Express server is running on port 3000
      const response = await axios.post('http://localhost:3000/api/books', bookData);
      setMessage(`Book created successfully! ID: ${response.data.id}`);
      setBookData({ title: '', author: '', year: '' }); // Clear form
    } catch (error) {
      setMessage(`Error creating book: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={bookData.title} onChange={handleChange} placeholder="Title" required /><br/>
        <input type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="Author" required /><br/>
        <input type="number" name="year" value={bookData.year} onChange={handleChange} placeholder="Year" required /><br/>
        <button type="submit">Create Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateBookForm;