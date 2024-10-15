import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import './PaginationSide.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
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
    navigate("/add-item");
  };

  const handleEditItem = (id: number) => {
    navigate(`/edit-item/${id}`);
  };

  // عرض نافذة التأكيد
  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  // حذف العنصر
  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      axios.delete(`https://test1.focal-x.com/api/items/${itemToDelete}`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        }
      })
        .then(() => {
          setDataApi(prevData => prevData.filter(item => item.id !== itemToDelete));
          setShowDeleteModal(false);
          setItemToDelete(null);
        })
        .catch(err => {
          console.error('Error deleting item:', err);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
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
              <div>
                <button onClick={(e) => { e.stopPropagation(); handleEditItem(item.id); }}>edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(item.id); }}>Delete</button>
              </div>
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

      {showDeleteModal && (
        <div className="delete-modal">
          <p>Are you sure you want to delete the product?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default PaginationSide;
