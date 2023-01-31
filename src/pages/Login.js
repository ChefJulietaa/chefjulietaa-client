import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";


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
    <div id="login-form" className="form-container">
      <h1 className="heading">Login</h1>

      <form onSubmit={handleLoginSubmit} className= "form">
      <div>
        <label className="label"> Email:</label>
        <input className="input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}/></div>
        <div>
        <label className="label"> Password:</label>
        <input className="input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword} /></div>

        <button className="button" type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p className="text">Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default Login;

