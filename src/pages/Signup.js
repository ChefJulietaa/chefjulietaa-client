
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL = process.env.REACT_APP_API_URL;


function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };
 
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <Container className="pt-5">
      <Row className="justify-content-md-center">
        <Col sm lg="4">
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" onChange={handleEmail}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" onChange={handlePassword}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" onChange={handleName}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">Sign Up</Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <p>Already have account? <Link to={"/login"}> Login</Link></p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {/* { errorMessage && <p className="error-message">{errorMessage}</p> } */}
    </Container>
  )
}

export default Signup;
