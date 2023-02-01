import { useEffect, useState, useContext } from "react";
// import RecipeListItem from "../components/RecipeListItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import service from "../api/service";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Card from "../components/Card";

export default function Recipes() {
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
              <Link className="link" to={`/recipes/${recipe._id}`}>
                View Recipe
              </Link>

              {/* condional renderring like in Navbar*/}
              {isLoggedIn &&
                recipe.author &&
                recipe.author._id === user._id && (
                  <Link className="link" to={`/recipes/edit/${recipe._id}`}>
                    Edit Recipe
                  </Link>
                )}
            </Card>
          ))}
      </Row>
    </Container>
  );
}
