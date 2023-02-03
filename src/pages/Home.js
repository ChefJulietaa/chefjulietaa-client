import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import service from "../api/service";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Card from "../components/Card";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function Recipes() {

  const navigate = useNavigate()

  // imported isLoggedIn from AuthContext to conditionally render buttons
  const { isLoggedIn, user } = useContext(AuthContext);

  let [recipes, setRecipes] = useState([]);

  useEffect(() => {
    service.getAllRecipes(setRecipes);
  }, []);

  return (
    <Container>
      <Row>
        {recipes.length !== 0 &&
          recipes.map((recipe) => (
            <Card recipe={recipe} key={recipe._id} preview>
              <Stack direction="horizontal" gap={1}>
                <Button variant="success" onClick={() => navigate(`/recipes/${recipe._id}`)}>View Recipe</Button>
                {isLoggedIn && recipe.author && recipe.author._id === user._id && (
                  <Button variant="outline-success" onClick={() => navigate(`/recipes/edit/${recipe._id}`)}>Edit Recipe</Button>
                )}
              </Stack>
            </Card>
          ))}
      </Row>
    </Container>
  );
}
