import { useSelector } from "react-redux"
import "../Stylesheets/Cart.css"
import { Alert, Table } from "react-bootstrap";
import { BiSolidPlusCircle, BiSolidMinusCircle } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { useRemoveFromCartMutation, useIncreaseCartMutation, useDecreaseCartMutation } from "../ReduxState/appApi"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../Components/CheckoutForm"

const stripePromise = loadStripe("pk_test_51NbOjlSAsMF5euiTpPIjWb8U2DQQT5RyWUXl2lojYOEGH9fj0gCzvwOTXfwIWzsTiUlvXS1nduOcmPf3F5QMSPV900yjGRyjXM")


function Cart() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);

    const userCart = user.cart;
    let cart = products.filter((product) => userCart[product._id] != null)

    const [increaseCart] = useIncreaseCartMutation()
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation()
    const [decreaseCart] = useDecreaseCartMutation()

    function handleDecrease({ userId, productId, price }) {
        const quantity = user.cart[productId];
        if (quantity <= 1) {
            return alert("You can remove the product from cart!!")
        }
        decreaseCart({ userId, productId, price })
    }

    return (
        <>
            {cart.length === 0 ? (
                <div style={{maxWidth:"500px", margin:"20px auto", textAlign:"center"}}>
                    <h3 className="mx-4">Your cart</h3>
                    <Alert variant="danger">Cart is Empty</Alert>
                </div>
            ) : (
                <div className="cartContainer">
                    <div className="cartDetails">
                        <h3 className="mb-4">Contact details</h3>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h3 className="mb-4">Your cart</h3>
                        {cart.length > 0 && (
                            <>
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>SubTotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((prod) => (

                                            <tr>
                                                <td>
                                                    <img src={prod.pictures[0].url} className="userCartProd" />
                                                </td>
                                                <td>
                                                    ₹{prod.price}
                                                </td>
                                                <td>
                                                    <BiSolidMinusCircle style={{ cursor: "pointer" }} onClick={() => handleDecrease({ userId: user._id, productId: prod._id, price: prod.price })} />
                                                    <span style={{ margin: "0px 5px" }}>{user.cart[prod._id]}</span>
                                                    <BiSolidPlusCircle style={{ cursor: "pointer" }} onClick={() => increaseCart({ userId: user._id, productId: prod._id, price: prod.price })} />
                                                </td>
                                                <td>
                                                    ₹{prod.price * user.cart[prod._id]}
                                                </td>
                                                <td>
                                                    {!isLoading && <MdDelete style={{ color: "red", cursor: "pointer" }} onClick={() => removeFromCart({ userId: user._id, productId: prod._id, price: prod.price })} />}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div>
                                    <h4>Total: ₹{user.cart.total}</h4>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart