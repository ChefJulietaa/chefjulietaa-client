import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";

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
    <Container>
      <form onSubmit={addIngredient}>
        <h1>Add ingredient</h1>
        <label>Title:</label>
        <input type="text"
          placeholder="title"
          name="title"
          onChange={(e) => setIngredient({ title: e.target.value })}></input>
          <button>Save</button>
      </form>
    </Container>
  );
}

export default AddIngredient;