import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Table from 'react-bootstrap/Table';
import { Badge, Button, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import "../Stylesheets/OrdersAdmin.css"

function OrdersAdmin() {
    const products = useSelector((state) => state.products)
    const [loading, setLoading] = useState(false)
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false)
    const [orders, setOrders] = useState([])

    async function getOrders() {
        const res = await fetch("https://periwinkle-sea-lion-gear.cyclic.app/orders")
        const data = await res.json()
        console.log(data);
        setOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getOrders()
    }, [])

    async function markAsShipped(orderId, ownerId) {
        const res = await fetch(`https://periwinkle-sea-lion-gear.cyclic.app/orders/${orderId}/shipped`, {
            method: "PATCH",
            body: ownerId
        })
        const data = await res.json()
        getOrders(data)

    }
    function showOrder(productOrdered) {
        let productsToShow = products.filter((product) => productOrdered[product._id]);
        productsToShow = productsToShow.map((prod) => {
            const prodCopy = { ...prod };
            prodCopy.count = productOrdered[prod._id];
            return prodCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }
    const handleClose = () => setShow(false);

    return (
        <>
            {loading ? (<div className="loading">
                <Spinner animation="border" variant="primary" />
            </div>) : (
                <div>
                    {orders?.length === 0 ? (
                        <h3 className="text-center mt-3">No Orders found</h3>
                    ) : (
                        <>
                            <Table responsive striped bordered hover size="md" className="text-center">
                                <thead>
                                    <tr>
                                        <th>OrderId</th>
                                        <th>Customer Name</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order) => (
                                        <tr key={order._id}>
                                            <td style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }} onClick={() => showOrder(order.products)}>{order._id}</td>
                                            <td>{order.owner?.username}</td>
                                            <td>{order.count}</td>
                                            <td>{order.date}</td>
                                            <td>₹{order.total}</td>
                                            <td>{order.address},{order.country}</td>
                                            <td>{order.status === "processing" ? <Button size="sm" onClick={() => markAsShipped(order._id, order.owner._id)}>Mark as shipped</Button> : <Badge bg="success">Shipped</Badge>}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Order details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {orderToShow.map((order) => (
                                        <div key={order._id} className="orderDetails">
                                            <img src={order.pictures[0].url} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                            <p>
                                                <span>{order.count} x </span> {order.productName}
                                            </p>
                                            <p>{order.category}</p>
                                            <p>Price: ₹{Number(order.price) * order.count}</p>
                                        </div>
                                    ))}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    )}
                </div>

            )}
        </>

    )
}

export default OrdersAdmin