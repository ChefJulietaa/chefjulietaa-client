import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function InputCard({
  title,
  setTitle,
  setDescription,
  description,
  method,
  setMethod,
  handleFileUpload,
  totalTime,
  setTotalTime,
  servings,
  setServings,
  handleFormSubmit,
  isUploadingImage,
  ingredients,
  handleIngredientAmountChange,
  handleIngredientChange,
  removeIngredientById,
  allIngredients,
  deleteRecipe,
  addIngredient,
  recipeId,
}) {
  const navigate = useNavigate();

  return (
    <Row className="justify-content-center">
      <Col sm={12} md={8} lg={6}>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Method</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={method || ""}
              onChange={(e) => setMethod(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="imageUrl"
              onChange={handleFileUpload}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Time</Form.Label>
            <Form.Control
              type="number"
              value={totalTime || ""}
              onChange={(e) => setTotalTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Servings</Form.Label>
            <Form.Control
              type="number"
              value={servings || ""}
              onChange={(e) => setServings(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Ingredients:</Form.Label>
          {ingredients.map((includedIngredient, ingredientIndex) => (
            <InputGroup size="sm" className="mb-3" key={ingredientIndex}>
              <Form.Control
                type="text"
                value={includedIngredient.amount || ""}
                onChange={(event) =>
                  handleIngredientAmountChange(event, ingredientIndex)
                }
              />
              <Form.Select
                value={includedIngredient.ingredient._id}
                onChange={(event) =>
                  handleIngredientChange(event, ingredientIndex)
                }
              >
                <option> -- Choose an ingredient --</option>
                {allIngredients.map((ingredient) => (
                  <option value={ingredient._id} key={ingredient._id}>
                    {ingredient.title}
                  </option>
                ))}
              </Form.Select>
              <Button
                variant="outline-danger"
                onClick={() => removeIngredientById(ingredientIndex)}
              >
                Delete an ingredient
              </Button>
            </InputGroup>
          ))}

          <Button
            className="m-3"
            variant="outline-warning"
            onClick={addIngredient}
          >
            Add another ingredient
          </Button>
          <Button
            className="m-3"
            variant="outline-info"
            onClick={() => navigate("/ingredients/add")}
          >
            Create a new ingredient
          </Button>
          {isUploadingImage ? (
            <Button className="m-3" disabled>
              Uploading...
            </Button>
          ) : (
            <Button className="m-3" variant="primary">
              {recipeId ? "Save" : "Create"} recipe
            </Button>
          )}
          {recipeId && (
            <Button className="m-3" variant="danger" onClick={deleteRecipe}>
              Delete
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
}

export default InputCard;
