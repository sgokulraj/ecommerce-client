import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import Carousels from "../Components/Carousels"
import { Col, Container, Row } from "react-bootstrap";
import "../Stylesheets/Productpage.css"
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Productpreview from "../Components/Productpreview";
import { useAddToCartMutation } from "../ReduxState/appApi";
import ToastMsg from "../Components/Toast";
import Similar from "../Components/Similar";

function Productpage() {
    const { id } = useParams()
    const user = useSelector((state) => state.user)
    const [product, setProduct] = useState(null)
    const [similarProduct, setSimilarProduct] = useState(null)
    const [addToCart, { isSuccess }] = useAddToCartMutation()

    async function getSingleProduct() {
        const res = await fetch(`https://periwinkle-sea-lion-gear.cyclic.app/products/${id}`)
        const data = await res.json()
        setProduct(data.product)
        setSimilarProduct(data.similarProduct)
        // console.log(data);
        // console.log(product);
    }

    useEffect(() => {
        getSingleProduct()
    }, [id])

    return (
        <>
            {!product ? (
                <div className="loading">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Container className="pt-4" style={{ position: "relative" }}>
                    <Row>
                        <Col lg={6}>
                            <Carousels product={product} />
                        </Col>
                        <Col lg={6}>
                            <h2>{product.productName}</h2>
                            <p><Badge bg="success">{product.category}</Badge></p>
                            <h4>{`₹ ${product.price}`}</h4>
                            <p className="prodDescription"><strong>Details:</strong> {product.description}</p>
                            {user && !user.isAdmin ? (
                                <>
                                    <div className="cartDiv">
                                        {!user.cart[id] ? (
                                            <>
                                                <Button variant="warning" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}>Add to cart</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="info">It's in your Cart</Button>
                                            </>
                                        )}

                                    </div>
                                    {isSuccess && <ToastMsg img={product.pictures[0].url} prodName={product.productName} />}
                                </>
                            ) : (
                                <Link to={`/product/${product._id}/edit`}>
                                    <Button variant="warning">Edit Product</Button>
                                </Link>)
                            }
                        </Col>
                    </Row>
                    <div className="my-5">
                        <h2>Similar Products</h2>
                        <div className="similarProd">
                            {similarProduct?.map((prod) => (
                                <Productpreview key={prod._id} {...prod} />
                            ))}
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}


export default Productpage