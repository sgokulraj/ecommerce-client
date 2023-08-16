import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProductCreationMutation } from "../ReduxState/appApi"
import "../Stylesheets/Newproduct.css"
import { Alert, Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { AiOutlineMinusCircle } from "react-icons/ai"

function Newproduct() {
    const navigate = useNavigate()
    // const [productName, setProductname] = useState("")
    // const [description, setDescription] = useState("")
    // const [price, setPrice] = useState("")
    // const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [removeImg, setRemoveImg] = useState(null)
    const [productDetails, setProductDetails] = useState({
        productName: "",
        description: "",
        price: "",
        category: ""
    })

    const [productCreation, { isError, error, isLoading, isSuccess }] = useProductCreationMutation()

    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target;
        setProductDetails((preVal) => {
            return { ...preVal, [name]: value }
        })
    }

    function selectImg() {
        const cloudWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dmaqngqvx",
                uploadPreset: "uozi891b"
            },
            (err, result) => {
                if (!err && result.event === "success") {
                    setImages({url: result.info.url, public_id: result.info.public_id })
                }
            }
        )
        cloudWidget.open()
    }

    async function deleteImage(deleteImg) {
        setRemoveImg(deleteImg.public_id);
        let res = await fetch(`https://periwinkle-sea-lion-gear.cyclic.app/images/${deleteImg.public_id}`, {
            method: "DELETE"
        })
        setRemoveImg(null);
        setImages((preVal) => preVal.filter((img) => img.public_id !== deleteImg.public_id))

    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (!productDetails.productName || !productDetails.description || !productDetails.price || !productDetails.category || !images.length) {
            return alert("Kindly fill all details")
        }
        const res = await productCreation({ ...productDetails, images })
        // console.log(res);
        if (res.data.length > 0) {
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    }

    return (
        <div className='newprodContainer'>
            <div className='newProd'>
                <h3>Create Product</h3>
                {isSuccess && <Alert variant="success">Product created successfully</Alert>}
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="productName"
                            type="text"
                            placeholder="productName"
                            name='productName'
                            value={productDetails.productName}
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="productName">Product name</label>
                    </Form.Floating>

                    <FloatingLabel controlId="floatingTextarea2" label="Product Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Description of your product"
                            style={{ height: '100px' }}
                            name="description"
                            value={productDetails.description}
                            required
                            onChange={handleChange}
                        />
                    </FloatingLabel>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="price"
                            type="number"
                            placeholder="Product price in ₹"
                            name='price'
                            value={productDetails.price}
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="price">Product Price in ₹</label>
                    </Form.Floating>

                    <FloatingLabel controlId="floatingSelect" label="Category" className="mb-3">
                        <Form.Select aria-label="Floating label select example" onChange={handleChange} name="category" value={productDetails.category}>
                            <option disabled>Select Category</option>
                            <option value="Mobiles & ElectronicDevices">Mobiles & Electronic devices</option>
                            <option value="Fashion & Beauty">Fashion & Beauty</option>
                            <option value="Sports">Sports</option>
                            <option value="BabyCare">Baby Care</option>
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel className="mb-3">
                        <Button type="button" onClick={selectImg}>Upload Cover Photo</Button>
                        <div className="previewContainer">
                            {images.map((image) => (
                                <div className="imgPreview">
                                    <img src={image.url} alt="image" />
                                    {removeImg != image.public_id && <AiOutlineMinusCircle className="deleteImg" onClick={() => deleteImage(image)} />}
                                </div>
                            ))}
                        </div>
                    </FloatingLabel>

                    <Button type="submit" disabled={isLoading || isSuccess}>Create</Button>
                </form>
            </div>
        </div>
    )
}

export default Newproduct