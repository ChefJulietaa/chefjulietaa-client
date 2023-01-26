import Header from "../components/Header";
import { useEffect, useState } from "react";
import RecipeListItem from "../components/RecipeListItem";
import axios from 'axios';

export default function Recipes() {
    let [recipes, setRecipes] = useState([]);
   
    const getAllRecipes = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
        .then((response) => { 
            console.log(response.data)
            setRecipes(response.data)
        })        
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllRecipes();
    },[]);

    return (
      <>
        <Header />
        <div>Recipes page</div>

        {recipes.map((recipe) => {
          return (
            <>
          <p>{recipe.title}</p>
          <p>{recipe.description}</p>
          <p>{recipe.title}</p>
          <p>{recipe.author}</p>
          <p>{recipe.totalTime}</p>
          <p>{recipe.servings}</p>
          {/* <p>{recipe.ingredients}</p> */}
          <p>{recipe.imageUrl}</p> 
          </>)
        })}
      </>
    );
}
