import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Register from './pajes/Register.jsx'
import Login from './pajes/Login.jsx'
import Auth from './pajes/Auth.jsx'
import Dashboard from './pajes/Dashboard.jsx'
import ListItem from './pajes/ListItem.jsx'
import CreateItem from './pajes/CreateItem.jsx'
import EditItem from './pajes/EditItem.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <ListItem /> },
      { path: 'products', element: <ListItem /> },
      { path: 'products/add', element: <CreateItem /> },
      { path: 'products/edit/:id', element: <EditItem /> } 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)
