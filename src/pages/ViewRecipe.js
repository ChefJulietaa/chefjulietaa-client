import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from '../components/Card'
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
      <Container>
        {recipe && <Card recipe={recipe} />}
      </Container>
  );
}
