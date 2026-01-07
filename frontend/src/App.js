import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import MyRecipes from './pages/MyRecipes';
import AdminPanel from './pages/AdminPanel';

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route 
          path="/add-recipe" 
          element={token ? <AddRecipe /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/my-recipes" 
          element={token ? <MyRecipes /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={token && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;