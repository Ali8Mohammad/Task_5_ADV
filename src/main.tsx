import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ShowItemInfo from './pages/ShowItemInfo/ShowItemInfo';
import AddItem from './pages/AddItem/AddItem';
import EditItem from './pages/EditItem/EditItem';
import DeleteItem from './pages/DeleteItem/DeleteItem';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
          path: "/",
          element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "item/:id",
        element: <ShowItemInfo />,
      },
      {
        path: "add-item",
        element: <AddItem />,
      },
      {
        path: "edit-item/:id",
        element: <EditItem />,
      },
      {
        path: "delete-item/:id",
        element: <DeleteItem />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
