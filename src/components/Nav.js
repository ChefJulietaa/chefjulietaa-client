import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import service from "../api/service";


function NavScrollExample() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        service.getAllIngredients(setIngredients)
    },[])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Recipes for everyone</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link href={`/recipes/add`}>Create recipe</Nav.Link>
              <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
              <NavDropdown title="Ingredients" id="navbarScrollingDropdown">
                {ingredients.map((ingredient) => (
                  <NavDropdown.Item>{ingredient.title}</NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
