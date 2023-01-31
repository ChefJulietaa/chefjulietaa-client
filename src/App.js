import './App.css';

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ViewRecipe from './pages/ViewRecipe';
import AddEditRecipe from "./pages/AddEditRecipe";
import Navbar from "./components/Navbar";     
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsPrivate from './components/isPrivate';

function App() {
  return (
    <div className="App">

<Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/recipes/:recipeId" element={<ViewRecipe />} /> */}
      {/* create a reacipe */}
      <Route path="/recipes/add" element={<IsPrivate> <AddEditRecipe/> </IsPrivate>} />
      {/* edit recipe */}
      <Route path="/recipes/edit/:recipeId" element={<IsPrivate> <AddEditRecipe/> </IsPrivate> } />  
      <Route path="/signup" element={<Signup /> } />
      <Route path="/login" element={<Login /> } />
    </Routes>
    </div>
  );
}

export default App;