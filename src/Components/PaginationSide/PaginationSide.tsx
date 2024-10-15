import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import './PaginationSide.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Button/Button';

interface Item {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const PaginationSide: React.FC = () => {
  const [dataApi, setDataApi] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
    }

    axios.get('https://test1.focal-x.com/api/items', {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      }
    })
      .then(res => {
        setDataApi(res.data);
        setFilteredItems(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, [navigate]);

  
  useEffect(() => {
    const filtered = dataApi.filter(item => 
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, dataApi]);
  
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  const handleAddNewItem = () => {
    
   navigate("/add-item")
  };
  
  const handleEditItem = (id: number) => {
    navigate(`/edit-item/${id}`);
  };

  return (
    <div className='PaginationSide'>
      <div>
        <input
          type="text"
          placeholder="Search product by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="searchInput"
        />
        <button onClick={handleAddNewItem}>ADD NEW PRODUCT</button>
      </div>
      {filteredItems.length > 0 ? (
        <div className="products">
          {currentItems.map((item: Item) => (
            <div 
              key={item.id} 
              className="product-item"
              onClick={() => handleItemClick(item.id)} 
            >
              <div className='cardItem'>
                <img className='PaginationItem' src={item.image_url} alt={item.name} />
              </div>
              <div>{item.name}</div>
              <button onClick={() => handleEditItem(item.id)}>edit</button>
            </div>
          ))}
        </div>
      ) : (        
        <div className="no-items-message">
          No products found.
        </div>
      )}

      {filteredItems.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default PaginationSide;
