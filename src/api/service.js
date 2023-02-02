import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api/recipes"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getAllRecipes = (setRecipes) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
    .then((response) => {
      setRecipes(response.data);
    })
    .catch((error) => console.log(error));
};


const getAllIngredients = (cb) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/ingredients`)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => console.log(error));
};

const uploadImage = (file) => {
  return api.post(`${process.env.REACT_APP_API_URL}/api/recipes/upload`, file)
    .then(res => res.data)
    .catch(errorHandler);
};



export default {
   uploadImage,
  getAllRecipes,
   getAllIngredients
   };
