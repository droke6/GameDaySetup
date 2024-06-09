import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound.jsx'
import MasterSchedule from './pages/MasterSchedule.jsx'
import NetHeights from './pages/NetHeights.jsx'
import GameSheets from './pages/GameSheets.jsx'
import Volleyball from './pages/Volleyball.jsx'
import Basketball from './pages/Basketball.jsx'
// import ProtectedRoute from './components/ProtectedRoutes.jsx'

function Logout() {
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path ='/' element={

            <Home />

        } />
        <Route path ='/volleyball' element={

            <Volleyball />

        } />

        <Route path='/basketball' element={

            <Basketball />

        }/>
        <Route path ='/master-schedule' element={

            <MasterSchedule />

        } />
        <Route path ='/net-heights' element={

            <NetHeights />

        } />
        <Route path ='/game-sheets' element={

            <GameSheets />

        } />

        <Route path='/login' element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
