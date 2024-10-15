import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddItem.css';

const AddItem: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // Handle image file input change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);

     axios.post('https://test1.focal-x.com/api/items', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    ).then(res => console.log(res))
    .catch(error => console.log(error))
      navigate('/dashboard');
   
  };

  return (
    <div className="add-item-container">
      <div className="add-item-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>←</button>
        <h2>ADD NEW ITEM</h2>
      </div>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter the product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            placeholder="Enter the product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default AddItem;
