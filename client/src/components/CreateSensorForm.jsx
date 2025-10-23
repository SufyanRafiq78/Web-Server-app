// /client/src/components/CreateSensorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CreateSensorForm() {
  const [formData, setFormData] = useState({ location: '', value: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      // POST to the correct Sensor route
      const response = await axios.post('http://localhost:3000/api/sensors', formData);
      setMessage(`Sensor reading recorded! ID: ${response.data.id} at ${new Date(response.data.timestamp).toLocaleTimeString()}`);
      setFormData({ location: '', value: '' }); // Clear form
    } catch (error) {
      setMessage(`Error recording sensor data: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
      <h3>Record New Sensor Reading</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Attic)" required /><br/>
        <input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Reading Value (e.g., 72.5)" step="0.1" required /><br/>
        <button type="submit">Record Reading</button>
      </form>
      <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>
    </div>
  );
}

export default CreateSensorForm;