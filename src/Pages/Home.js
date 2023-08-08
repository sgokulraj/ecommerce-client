import { Link } from "react-router-dom"
import banner from "../images/laptop_12.jpg"
import sales from "../images/sales.jpg"
import { BiSolidChevronRightCircle } from "react-icons/bi"
import categories from "../Categories"
import "../Stylesheets/Home.css"
import Image from 'react-bootstrap/Image';
import { Col, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../ReduxState/ProductSlice"
import Productpreview from "../Components/Productpreview"

function Home() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
    let latestProducts;
    if (products.length) {
        latestProducts = products.slice(0, 8)
    }

    async function getProducts() {
        const res = await fetch("https://periwinkle-sea-lion-gear.cyclic.app/products")
        // console.log(res);
        const data = await res.json() //=> it gives array of objects
        // console.log(data);
        dispatch(setProducts({ data }))
    }
    useEffect(() => {
        getProducts()
    }, [])

    // console.log(products);
    return (
        <div className="homeContainer">
            <Image src={sales} fluid />
            <div className="featuredProducts container">
                <h3 style={{ textAlign: "center" }}>Latest Products</h3>
                <div className="latestProducts">
                    {latestProducts?.map((prod) => (
                        <Productpreview key={prod._id} {...prod} />
                    ))}
                </div>
                <div>
                    <Link to="/category/all" className="moreProducts">
                        More Products <BiSolidChevronRightCircle style={{ fontSize: "20px" }} />
                    </Link>
                </div>
            </div>
            <div className="salesImgContainer">
                <Image src={banner} fluid />
            </div>
            <div className="container my-4">
                <h3 style={{ textAlign: "center" }}>Category</h3>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>

            </div >

        </div >
    )
}

export default Home