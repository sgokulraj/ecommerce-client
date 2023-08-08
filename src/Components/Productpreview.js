import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import "../Stylesheets/Productpreview.css"



function Productpreview({ _id, category, productName, pictures }) {
    return (
        <Link to={`/product/${_id}`} className="previewContainer">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={pictures[0].url} className="previewImg"/>
                <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Badge bg="success">{category}</Badge>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Productpreview