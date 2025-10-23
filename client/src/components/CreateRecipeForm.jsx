// /client/src/components/CreateRecipeForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CreateRecipeForm() {
  const [formData, setFormData] = useState({ name: '', prepTime: '', servings: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      // POST to the correct Recipe route
      const response = await axios.post('http://localhost:3000/api/recipes', formData);
      setMessage(`Recipe created successfully! ID: ${response.data.id}`);
      setFormData({ name: '', prepTime: '', servings: '' }); // Clear form
    } catch (error) {
      setMessage(`Error creating recipe: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
      <h3>Create New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Recipe Name" required /><br/>
        <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} placeholder="Prep Time (e.g., 25 min)" required /><br/>
        <input type="number" name="servings" value={formData.servings} onChange={handleChange} placeholder="Servings" required /><br/>
        <button type="submit">Create Recipe</button>
      </form>
      <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>
    </div>
  );
}

export default CreateRecipeForm;