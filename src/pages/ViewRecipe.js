import Header from "../components/Header";
import { useEffect, useState } from "react";
// import RecipeListItem from "../components/RecipeListItem";
import axios from "axios";
// import { Link } from "react-router-dom";
// import AddRecipe from "../components/AddRecipe";
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
      
      <h3>{recipe.title}</h3>
      <h3>{recipe.description}</h3>
      <h3>{recipe.title}</h3>
      <h3>{recipe.author.name}</h3>
      <h3>{recipe.totalTime}</h3>
      <h3>{recipe.servings}</h3>
      {/* <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.amount}</li>
        ))}
      </ul> */}
      <img src={recipe.imageUrl} alt={recipe.title} />
    </>
  );
}

