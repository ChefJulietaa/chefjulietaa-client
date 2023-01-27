import './App.css';

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import EditRecipe from "./pages/EditRecipe";
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/add/:recipeId" element={ <AddRecipe /> } />
      <Route path="/recipes/edit/:recipeId" element={ <EditRecipe /> } />  
    </Routes>
    </div>
  );
}
export default App;
