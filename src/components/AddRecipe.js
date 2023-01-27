import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AddRecipe(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");

// Form submission
  const handleFormSubmit = (e) => {                        
    e.preventDefault();

    const requestBody = { title, description, imageUrl, author, totalTime, servings, ingredients };
 

    // refreshing the list of recipes once a new recipe is created
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/recipes`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setImageUrl("");
        setAuthor("");
        setTotalTime("");
        setServings("");
        setIngredients("");
      
        props.refreshRecipes();      
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddRecipe">
      <Link to={`/`}>Home</Link>
    <div className='form'>
      <h3>Create Recipe</h3>
{/* requesting to create a new recipe */}
      <form onSubmit={handleFormSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          placeholder='title'
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          placeholder='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Image:</label>
        <textarea
          name="imageUrl"
          placeholder="image url here..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Author:</label>
        <input
          type="text"
          placeholder='author'
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Total Time:</label>
        <input
          type="text"
          placeholder="total time"
          name="totalTime"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
        />
        <label>Servings:</label>
        <input
          type="text"
          placeholder='servings'
          name="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
        <label>ingredients:</label>
        <textarea
          name="ingredients"
          placeholder="comma separated ingredients here..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </form>
      <button onClick={AddRecipe}>Create Recipe</button>
      </div>
    </div>
  );
}

export default AddRecipe;













