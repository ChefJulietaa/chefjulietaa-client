import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";


function AddRecipe(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([{ amount: '', ingredient: '' }]);
  const [allIngredients, setAllIngredients] = useState([]);
  
  const { user } = useContext(AuthContext);

  const getAllIngredients = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      .then((response) => {
        setAllIngredients(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

// Form submission
  const handleFormSubmit = (e) => {              
    e.preventDefault();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

    const requestBody = { title, description, imageUrl, author: user._id, totalTime, servings, ingredients };
    // refreshing the list of recipes once a new recipe is created
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/recipes`, requestBody, 
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setImageUrl("");
        setTotalTime("");
        setServings("");
        setIngredients([{ amount: '', ingredient: '' }]);
      
        props.refreshRecipes();      
      })
      .catch((error) => console.log(error));
  };

  const handleIngredientChange = (event, ingredientIndex) => {
    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (ingredientIndex === index) return { amount: ingredient.amount, ingredient: event.target.value }
      return ingredient
    })
    setIngredients(updatedIngredients)
  }

  const handleIngredientAmountChange = (event, ingredientIndex) => {
    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (ingredientIndex === index) return { amount: event.target.value, ingredient: ingredient.ingredient }
      return ingredient
    })
    setIngredients(updatedIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: '', ingredient: '' }])
  }

  return (
    <div className="AddRecipe">
      <Link to={`/`}>Home</Link>
    <div className='form'>
      <h3>Create Recipe</h3>
{/* requesting to create a new recipe */}
      <form onSubmit={handleFormSubmit}> 
      <div>
        <label>Title:</label>
        <input
          type="text"
          placeholder='title'
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div>
        <label>Description:</label>
        <textarea
          name="description"
          placeholder='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <label>Image:</label>
        <textarea
          name="imageUrl"
          placeholder="image url here..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        </div>
        <div>
        <label>Total Time:</label>
        <input
          type="text"
          placeholder="total time"
          name="totalTime"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
        /></div>
        <div>
        <label>Servings:</label>
        <input
          type="text"
          placeholder='servings'
          name="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        /></div>
        <label>Ingredients:</label>
        <div>
            {ingredients.map((includedIngredient, ingredientIndex) => (
              <div>
                <input 
                  type="text" 
                  value={includedIngredient.amount} 
                  onChange={(event) => handleIngredientAmountChange(event, ingredientIndex)}
                />
                <select onChange={(event) => handleIngredientChange(event, ingredientIndex)}>
                  {allIngredients.map((ingredient) => (
                    <option value={ingredient._id}>{ingredient.title}</option>
                  ))}
                </select>
              </div>
            ))}
          <button type="button" onClick={addIngredient}>Add ingredient</button>
        </div>


        {/* <label>ingredients:</label>
        <textarea
          name="ingredients"
          placeholder="comma separated ingredients here..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        /> */}
        <button>Create Recipe</button>
      </form>
      
      </div>
    </div>
  );
}

export default AddRecipe;













