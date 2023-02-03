import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const API_URL = process.env.REACT_APP_API_URL;


function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken); 
        authenticateUser()
        navigate('/');                                 
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
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" onChange={handleEmail}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" onChange={handlePassword}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">Log in</Button>
            </Form.Group>

            { errorMessage && (
              <Alert variant="danger">{errorMessage}</Alert>
            )}

            <Form.Group className="mb-3">
              <p>Don't have an account yet? <Link to={"/signup"}> Sign up</Link></p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      
    </Container>

 
  )
}

export default Login;

