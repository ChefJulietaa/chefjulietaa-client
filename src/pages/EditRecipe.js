import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";


function EditRecipe (props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
 
  const { recipeId } = useParams();
  const navigate = useNavigate();  
    // Get the URL parameter `:projectId` 
    // we are obtaining the project id coming from the URL using the hook useParams
    // we are populating the input fields with the actual title and description of the project. To do this we added an effect that makes an axios GET request to our backend to get the project information.
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`)
        .then((response) => {
          /* 
              We update the state with the project data coming from the response.
              This way we set inputs to show the actual title and description of the project
            */
          const oneRecipe = response.data;
          setTitle(oneRecipe.title);
          setDescription(oneRecipe.description);
          setImageUrl(oneRecipe.imageUrl)
          setAuthor(oneRecipe.author)
          setTotalTime(oneRecipe.totalTime)
          setServings(oneRecipe.servings)
          setIngredients(oneRecipe.ingredients)
        })
        .catch((error) => console.log(error));
    }, [recipeId]);


    const handleFormSubmit = (e) => {                     
      e.preventDefault();
      // Create an object representing the body of the PUT request
      const requestBody = { title, description, imageUrl, author, totalTime, servings, ingredients };
    
      // Make a PUT request to update the project
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`, requestBody)
        .then((response) => {
          // Once the request is resolved successfully and the project
          // is updated we navigate back to the details page
          navigate(`/recipes/${recipeId}`)
        });
    };

    const deleteRecipe = () => {                    
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      // Make a DELETE request to delete the recipe
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => {
          // Once the delete request is resolved successfully
          // navigate back to the list of recipes
          navigate("/");
        })
        .catch((err) => console.log(err));
    };  
     

  return (
    <div className="EditRecipe">
     <Link to={`/`}>Home</Link>
      <h3>Edit the Recipe</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Image:</label>
        <textarea
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Total Time:</label>
        <input
          type="text"
          name="totalTime"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
        />
        <label>Servings:</label>
        <input
          type="text"
          name="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
        <label>ingredients:</label>
        <textarea
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={deleteRecipe}>Delete Recipe</button>
    </div>
  );
}

export default EditRecipe;
