
import './App.css'

import Profile from '../component/Profile'
import UserContextProvider from '../component/UserContextProvider'
import Login from '../component/Login'
import Layout from './Layout'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>

        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route path='' element={<Profile/>}/>
              <Route path='Login' element={<Login/>}/>
          </Route>
        </Routes>

      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App