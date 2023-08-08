import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import Productpreview from "../Components/Productpreview"
import "../Stylesheets/Categorypage.css"
import Spinner from 'react-bootstrap/Spinner';


function Categorypage() {
    const { category } = useParams()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    async function getCategory() {
        let res = await fetch(`https://periwinkle-sea-lion-gear.cyclic.app/products/category/${category}`)
        let data = await res.json()
        setProducts(data)
    }

    useEffect(() => {
        getCategory()
    }, [category])

    const searchProducts = products.filter((product) => product.productName.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            {!products ? (
                <div className="loading">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className="categoryContainer">
                    <div className="my-3">
                        <h1>{category}</h1>
                    </div>
                    <div className="my-3">
                        <input type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} className="px-2" />
                    </div>
                    {searchProducts.length === 0 ? (
                        <p> No Products found</p>
                    ) : (
                        <div>
                            <div className="searchProd">
                                {searchProducts.map((product) => (
                                    <Productpreview key={product._id} {...product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>

    )
}

export default Categorypage