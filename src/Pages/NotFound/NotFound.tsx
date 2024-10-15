import defaultImage from '../../assets/img/defaultImage.png'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='NotFound'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img src={defaultImage} alt="" />
    </div>
  );
};

export default NotFound;
