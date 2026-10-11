import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Layout from './Layout.jsx';
import Home from '../components/Home/Home.jsx'
import About from '../components/About/About.jsx'
import Leetcode from '../components/Leetcode/Leetcode.jsx'
import Client from '../components/Client/Client.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="About" element={<About/>}/>
        <Route path='Leetcode' element={<div className='working-page'>Working</div>}/>
        <Route path='Leetcode/:Nishchal' element={<Leetcode/>}/>
        <Route path='Client' element={<Client/>}/>
      </Route>

    </Routes> 
  </BrowserRouter>
)
