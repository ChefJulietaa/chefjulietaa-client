import { Link } from "react-router-dom";
// import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
 
function Navbar() {

  const {
     isLoggedIn,
     user,
     logOutUser   
    } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
 {isLoggedIn && (
        <>
      {/* <Link to="/recipes">
        <button>Recipes</button>
      </Link> */}

      <Link to={`/recipes/add`}>
        <button>Create recipe</button>
      </Link>

      <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button> </Link>
        </>)}
    </nav>
  );
}
 
export default Navbar;