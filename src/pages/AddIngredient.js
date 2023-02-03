import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddIngredient() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");  
  const [ingredient, setIngredient] = useState({ title: '' })

  const addIngredient = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/ingredients`, ingredient, 
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container className="pt-5">
      <Row className="justify-content-md-center">
        <Col sm lg="4">
          <h1 className="heading">Create a new ingredient</h1>
          <Form onSubmit={addIngredient}>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" placeholder="Ingredient name" onChange={(e) => setIngredient({ title: e.target.value })}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {/* { errorMessage && <p className="error-message">{errorMessage}</p> } */}
    </Container>
  );
}

export default AddIngredient;