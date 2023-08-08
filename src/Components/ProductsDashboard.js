import { Button, Container } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import "../Stylesheets/ProductDashboard.css"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useProductDeletionMutation } from "../ReduxState/appApi"

function ProductsDashboard() {
    const products = useSelector((state) => state.products)
    const user = useSelector((state) => state.user)
    const [productDeletion, { isSuccess, isLoading }] = useProductDeletionMutation()

    function handleDelete(productId, userId) {
        let confirmation = window.confirm("Are you sure to delete this product")
        if (confirmation) {
            productDeletion({ productId, userId })
        }
    }
    return (
        <Container style={{ textAlign: "center" }}>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr>
                            <td>
                                <img src={prod.pictures[0].url} alt="img" className="prodDashboard" />
                            </td>
                            <td>{prod._id}</td>
                            <td>{prod.productName}</td>
                            <td>₹ {prod.price}</td>
                            <td>
                                <Link to={`/product/${prod._id}/edit`}><AiFillEdit style={{ fontSize: "20px" }} /></Link>
                                <AiFillDelete className="mx-2" style={{ color: "red", fontSize: "20px", cursor:"pointer" }} onClick={() => handleDelete(prod._id, user._id)} disabled={isLoading} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default ProductsDashboard