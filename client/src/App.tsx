import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Spam from './pages/spam'


function App() {

  const token=localStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth/>} />
          <Route path='/' element={token ?<Home/> : <Auth/>} />
          <Route path='/spam' element={token ?<Spam/> : <Auth/>} />
          <Route path='/user' element={token ? <Profile/> : <Auth/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
