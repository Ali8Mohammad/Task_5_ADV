import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditItem: React.FC = () => {
  const { id } = useParams(); // جلب الـ id من الرابط
  const navigate = useNavigate();
  
  const [item, setItem] = useState({
    name: '',
    price: '',
    image_url: ''
  });
  
  useEffect(() => {
    axios.get(`https://test1.focal-x.com/api/items/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      }
    })
    .then((response) => {
      setItem({
        name: response.data.name,
        price: response.data.price,
        image_url: response.data.image_url
      });
    })
    .catch((error) => {
      console.error('Error fetching item details:', error);
    });
  }, [id]);
  
  const handleSave = () => {
    axios.put(`https://test1.focal-x.com/api/items/${id}`, item, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      }
    })
    .then(() => {
      navigate(`/item/${id}`);
    })
    .catch((error) => {
      console.error('Error updating item:', error);
    });
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <label>
        Name:
        <input 
          type="text" 
          value={item.name} 
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </label>
      <label>
        Price:
        <input 
          type="text" 
          value={item.price} 
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
      </label>
      <label>
        Image:
        <input 
          type="text" 
          value={item.image_url} 
          onChange={(e) => setItem({ ...item, image_url: e.target.value })}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditItem;
