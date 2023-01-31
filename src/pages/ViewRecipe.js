import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewRecipe() {

  let [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();


  const getRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <Header />
      <div>Recipes</div>
      <div className="container"> 
      <Link to={`/`}>Home</Link>
          {recipe.title &&
            <div className="card">
      <h3>{recipe.title}</h3>
      <h3>{recipe.description}</h3>
      <h3>{recipe.title}</h3>
      <h3>{recipe.author.name}</h3>
      <h3>{recipe.totalTime}</h3>
      <h3>{recipe.servings}</h3>
      <ul>Ingredients: 
              {recipe.ingredients.map((item) => (
                <li key={item._id}>
                {item.amount} {item.ingredient.title}
                </li>
              ))}
            </ul>  
      <img src={recipe.imageUrl} alt={recipe.title} />
      </div>}
      </div>
    </>
  );
} 

