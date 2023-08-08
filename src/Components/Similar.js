import { Badge, Card, Container } from "react-bootstrap";
import "../Stylesheets/Productpreview.css"
import { Link } from "react-router-dom";

function Similar({ _id, productName, category, pictures }) {
    
    return (
        <Link to={`/product/${_id}`} className="previewContainer">
            <Card style={{ width: "18rem"}}>
                <Card.Img variant="top" src={pictures[0].url}  className="previewImg" />
                <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Badge bg="success">
                        {category}
                    </Badge>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Similar;