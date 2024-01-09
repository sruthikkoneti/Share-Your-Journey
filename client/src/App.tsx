import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MapPage from './pages/MapPage'
import LandingPage from './pages/LandingPage'
import Custom from './pages/Custom'
import CreatePage from './pages/CreatePage'

function App() {

  const token = localStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={token ? <Home /> : <Auth />} />
          <Route path='/map' element={token ? <MapPage /> : <Auth />} />
          <Route path='/user' element={token ? <Profile /> : <Auth />} />
          <Route path='/search/:location' element={<Custom />} />
          <Route path='/create' element={<CreatePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
