import './App.css';

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import EditRecipe from "./pages/EditRecipe";
import AddRecipe from './components/AddRecipe';
import Navbar from "./components/Navbar";     
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">

<Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/add/:recipeId" element={ <AddRecipe /> } />
      <Route path="/recipes/edit/:recipeId" element={ <EditRecipe /> } />  
      <Route path="/signup" element={<Signup /> } />
      <Route path="/login" element={<Login /> } />
    </Routes>
    </div>
  );
}

export default App;




