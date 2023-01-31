import Header from "../components/Header";
import { useEffect, useState, useContext } from "react";
// import RecipeListItem from "../components/RecipeListItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
 

export default function Recipes() {
  // imported isLoggedIn from AuthContext to conditionally render buttons
  const { isLoggedIn, user } = useContext(AuthContext);
  
  let [recipes, setRecipes] = useState([]);

  const getAllRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <Header />
      <div>Recipes</div>
      <div className="container"> 
         {recipes.length !== 0 && recipes.map((recipe) => (
          <div className="card" key={recipe._id}>
          
            <h3>{recipe.title}</h3>
             {/* <h3>Description: {recipe.description}</h3>
            <h3>Author: {recipe.author.name}</h3>
            <h3>Total Time: {recipe.totalTime} mins</h3>
            <h3>Servings: {recipe.servings} servings</h3>
            <ul>Ingredients: 
              {recipe.ingredients.map((item) => (
                <li key={item._id}>
                {item.amount} {item.ingredient.title}
                </li>
              ))}
            </ul>  */}
            <img src={recipe.imageUrl} alt={recipe.title} />
            <Link className="link" to={`/recipes/${recipe._id}`}>View Recipe</Link>
          
      
             condional renderring like in Navbar
            {isLoggedIn && recipe.author._id === user._id && (
              <>
                <Link className="link" to={`/recipes/edit/${recipe._id}`}>Edit Recipe</Link>
              </>
            )}
          </div>
        ))} 
      </div>
    </>
  );
} 

 