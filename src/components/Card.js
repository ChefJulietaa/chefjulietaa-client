import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function KitchenSinkExample({
  recipe: {
    title,
    description,
    method,
    totalTime,
    servings,
    ingredients,
    author,
    imageUrl,
  },
    children,
  preview=false
}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
       
      </Card.Body>
          {!preview && <ListGroup className="list-group-flush">
              <ListGroup.Item>Method: {method}</ListGroup.Item>
              <ListGroup.Item>Servings: {servings}</ListGroup.Item>
              <ListGroup.Item>Total Time: {totalTime} minutes</ListGroup.Item>
              {author && <ListGroup.Item>Author: {author.name}</ListGroup.Item>}
          </ListGroup>
          }
      <Card.Body>
              {!preview && <ul>
                  Ingredients:
                  {ingredients &&
                      ingredients.map((item) => (
                          <li key={item._id}>
                              {item.amount} {item.ingredient.title}
                          </li>
                      ))}
              </ul>}
        {children}
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;
