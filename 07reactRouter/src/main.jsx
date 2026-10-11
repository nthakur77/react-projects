import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from '../component/home/Home'
import About from '../component/about/About'


const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      }, 
      {
        path: "about", 
        element: <About/>
      },
      {
        path: ""
      }
    ]
  }]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
