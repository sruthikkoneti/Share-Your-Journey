import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'


function App() {

  const token=localStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth/>} />
          <Route path='/' element={token ?<Home/> : <Auth/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
