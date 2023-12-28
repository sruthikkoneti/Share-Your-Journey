import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MapPage from './pages/MapPage'
import Create from './pages/Create'


function App() {

  const token = localStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={token ? <Home /> : <Auth />} />
          <Route path='/map' element={token ? <MapPage /> : <Auth />} />
          <Route path='/user' element={token ? <Profile /> : <Auth />} />
          <Route path='/create' element={token ? <Create /> : <Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
