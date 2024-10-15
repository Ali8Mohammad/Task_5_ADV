import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';

const App: React.FC = () => {
  const location = useLocation();


  const hideSidebarPages = ['/', '/signup', '/404']; 

  
  const shouldShowSidebar = !hideSidebarPages.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar && <Sidebar />}
      <Outlet />
    </>
  );
};

export default App;
