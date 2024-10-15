import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../.././assets/img/logo2.svg';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('image');
    navigate('/login'); 
  };
  
  const userName = localStorage.getItem('username') || 'Guest';
  const userImage = localStorage.getItem('image') || '/path/to/default-image.jpg';

  return (
    <div className='sideBar'>
      <img className='logo' src={logo} alt="Logo" />
      <div>
        <img className='userNameImg' src={userImage} alt="User" />
        <h3 className='userName'>{userName}</h3>
      </div>
      <div className="navItems">
        <Link to={'products'}>Products</Link>
        <Link to={'Favourites'}>Favourites</Link>
        <Link to={'order-list'}>Order list</Link>
      </div>
      <Link to="/" onClick={handleLogout}>Logout</Link>

    </div>
  );
};

export default Sidebar;
