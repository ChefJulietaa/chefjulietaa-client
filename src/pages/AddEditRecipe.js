import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import service from "../api/service";
import Container from "react-bootstrap/Container";
import InputCard from "../components/InputCard";

function AddEditRecipe(props) {
  const navigate = useNavigate();

  const { recipeId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([
    { amount: "", ingredient: "" },
  ]);
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
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

  const { user } = useContext(AuthContext);

  const deleteRecipe = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const getRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`)
      .then((response) => {
        const {
          title,
          description,
          imageUrl,
          totalTime,
          servings,
          ingredients,
        } = response.data;
        setTitle(title);
        setDescription(description);
        setMethod(method);
        setImageUrl(imageUrl);
        setTotalTime(totalTime);
        setServings(servings);
        setIngredients(ingredients);
      })
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

    const requestBody = {
      title,
      description,
      method,
      imageUrl,
      author: user._id,
      totalTime,
      servings,
      ingredients,
    };
    // refreshing the list of recipes once a new recipe is created
    if (recipeId) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`,
          requestBody,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          // Reset the state
          setTitle("");
          setDescription("");
          setMethod("");
          setImageUrl("");
          setTotalTime("");
          setServings("");
          setIngredients([{ amount: "", ingredient: "" }]);
          navigate("/");
        })
        .catch((error) => console.log(error));
    } else {
      console.log(requestBody);
      console.log(ingredients);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/recipes`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Reset the state
          setTitle("");
          setDescription("");
          setMethod("");
          setImageUrl("");
          setTotalTime("");
          setServings("");
          setIngredients([{ amount: "", ingredient: "" }]);
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleIngredientChange = (event, ingredientIndex) => {
    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (ingredientIndex === index)
        return { amount: ingredient.amount, ingredient: event.target.value };
      return ingredient;
    });
    setIngredients(updatedIngredients);
  };

  const handleIngredientAmountChange = (event, ingredientIndex) => {
    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (ingredientIndex === index)
        return {
          amount: event.target.value,
          ingredient: ingredient.ingredient,
        };
      return ingredient;
    });
    setIngredients(updatedIngredients);
  };

  const removeIngredientById = (ingredientIndex) => {
    const updatedIngredients = ingredients.filter((ingredient, index) => {
      return index !== ingredientIndex;
    });
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: "", ingredient: "" }]);
  };

  return (
    <Container>
      <h3 className="text-center">
        {recipeId && "Edit"}
        {!recipeId && "Create"} Recipe
      </h3>
      <InputCard
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        method={method}
        setMethod={setMethod}
        handleFileUpload={handleFileUpload}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        servings={servings}
        setServings={setServings}
        handleFormSubmit={handleFormSubmit}
        isUploadingImage={isUploadingImage}
        ingredients={ingredients}
        handleIngredientAmountChange={handleIngredientAmountChange}
        handleIngredientChange={handleIngredientChange}
        removeIngredientById={removeIngredientById}
        allIngredients={allIngredients}
        deleteRecipe={deleteRecipe}
        addIngredient={addIngredient}
        recipeId={recipeId}
      />
    </Container>
  );
}

export default AddEditRecipe;
