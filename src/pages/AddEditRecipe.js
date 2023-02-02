import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import service from "../api/service";

function AddEditRecipe(props) {
  const navigate = useNavigate();

  const { recipeId } = useParams(); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([{ amount: '', ingredient: '' }]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileUpload = (e) => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    setIsUploadingImage(true);  

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally ( () => {
        setIsUploadingImage(false); 
      });
  };

  const { user } = useContext(AuthContext);

  const getRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`)
      .then((response) => {
        const { title, description, imageUrl, totalTime, servings, ingredients } = response.data
        setTitle(title);
        setDescription(description);
        setImageUrl(imageUrl);
        setTotalTime(totalTime);
        setServings(servings);
        setIngredients(ingredients);
      } )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    service.getAllIngredients(setAllIngredients);
    if (recipeId) {
      getRecipe();
    }
  }, [recipeId]);

// Form submission
  const handleFormSubmit = (e) => {              
    e.preventDefault();

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    const requestBody = { title, description, imageUrl, author: user._id, totalTime, servings, ingredients };
    // refreshing the list of recipes once a new recipe is created
    if (recipeId) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`, requestBody, 
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          // Reset the state
          setTitle("");
          setDescription("");
          setImageUrl("");
          setTotalTime("");
          setServings("");
          setIngredients([{ amount: '', ingredient: '' }]);
          navigate('/');
        })
        .catch((error) => console.log(error));
    }
    else {
      console.log(requestBody)
      console.log(ingredients)
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
          navigate('/');
        })
        .catch((error) => console.log(error));
    }    
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

  const removeIngredientById = (ingredientIndex) => {
    const updatedIngredients = ingredients.filter((ingredient, index) => { 
      return index !== ingredientIndex
    })
    setIngredients(updatedIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: '', ingredient: '' }])
  }

  return (
    <div className="AddRecipe">
    <div className='form'>
      <h3>{ recipeId && 'Edit'}{ !recipeId && 'Create'} Recipe</h3>
{/* requesting to create a new recipe */}
      <form onSubmit={handleFormSubmit}> 
      <div>
        <label>Title:</label>
        <input
          type="text"
          placeholder='title'
          name="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div>
        <label>Description:</label>
        <textarea
          name="description"
          placeholder='description'
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <label>Image:</label>
        <input type="file" 
          name="imageUrl"
        
          onChange={handleFileUpload}
        />
        </div>
        <div>
        <label>Total Time:</label>
        <input
          type="text"
          placeholder="total time"
          name="totalTime"
          value={totalTime || ""}
          onChange={(e) => setTotalTime(e.target.value)}
        /></div>
        <div>
        <label>Servings:</label>
        <input
          type="text"
          placeholder='servings'
          name="servings"
          value={servings || ""}
          onChange={(e) => setServings(e.target.value)}
        /></div>
        <label>Ingredients:</label>
        <div>
            {ingredients.map((includedIngredient, ingredientIndex) => (
              <div key={ingredientIndex}>
                <input 
                  type="text" 
                  value={includedIngredient.amount || ""} 
                  onChange={(event) => handleIngredientAmountChange(event, ingredientIndex)}
                />
                <select value={includedIngredient.ingredient._id} onChange={(event) => handleIngredientChange(event, ingredientIndex)}>
                  <option> -- Choose an ingredient --</option>
                  {allIngredients.map((ingredient) => (
                    <option value={ingredient._id} key={ingredient._id}>{ingredient.title}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeIngredientById(ingredientIndex)}>Delete an ingredient</button>
              </div>
            ))}
          <button type="button" onClick={addIngredient}>Add another ingredient</button>
        </div>
        { isUploadingImage 
      ? <button type="submit" disabled>Uploading...</button>
      : <button type="submit" >Create a recipe</button>
    }
      </form>
      </div>
    </div>
  );
}

export default AddEditRecipe;