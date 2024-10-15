import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ShowItemInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`https://test1.focal-x.com/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setItem(response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching item details:', err);
      setError('Error fetching item details');
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.name}</h2>
          <img src={item.image_url} alt={item.name} />
          <p>Price: {item.price}</p>
          <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
          <p>Updated at: {new Date(item.updated_at).toLocaleString()}</p>
        </div>
      ) : (
        <div>No item found</div>
      )}
    </div>
  );
};

export default ShowItemInfo;
