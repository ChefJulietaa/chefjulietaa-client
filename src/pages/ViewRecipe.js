import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from '../components/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Container className="pt-5">
         <Row className="justify-content-md-center">
            <Col sm lg="4">
              {recipe && <Card recipe={recipe} />}
            </Col>
          </Row>
      </Container>
  );
}
