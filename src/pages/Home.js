// import { Link } from "react-router-dom"


// export default function Home() {
//     return (
//         <div >
//             <div>
//                 <h2><Link to='/recipes'>All Recipes</Link></h2>
//             </div>
//         </div>
//     )
// }

import Header from "../components/Header";
import { useEffect, useState } from "react";
// import RecipeListItem from "../components/RecipeListItem";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Recipes() {
  let [recipes, setRecipes] = useState([]);

  const getAllRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then((response) => {
        console.log(response.data);
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
        {recipes.map((recipe) => (
          <div className="card" key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <h3>{recipe.title}</h3>
            <h3>Description: {recipe.description}</h3>
            <h3>Author: {recipe.author}</h3>
            <h3>Total Time: {recipe.totalTime} mins</h3>
            <h3>Servings: {recipe.servings} servings</h3>
            <ul>Ingredients: 
              {recipe.ingredients.map((item) => (
                <li key={item._id}>
                {item.amount} {item.ingredient.title}
                </li>
              ))}
            </ul>
            <img src={recipe.imageUrl} alt={recipe.title} />
            </Link>
            <Link className="link" to={`/recipes/edit/${recipe._id}`}>Edit Recipe</Link>
            <Link className="link" to={`/recipes/add/${recipe._id}`}>Create recipe</Link>
          </div>
        ))}
      </div>
    </>
  );
} 

 