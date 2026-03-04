import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import MyRentals from './pages/MyRentals';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundError from './pages/NotFoundError';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} /> 
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes protégées */}
        <Route 
          path="/my-rentals" 
          element={
              <MyRentals />
          } 
        />
        
        {/* Routes d'administration (exemple) */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-red-600 mb-4">Panel Admin</h1>
                  <p className="text-gray-300">Zone réservée aux administrateurs</p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        
        {/* Route 404 - doit être en dernier */}
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App