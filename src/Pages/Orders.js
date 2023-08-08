import { useState, useEffect } from "react"
import "../Stylesheets/Orders.css"
import { useSelector } from "react-redux"
import Table from 'react-bootstrap/Table';
import { Badge, Spinner } from 'react-bootstrap';


function Orders() {
    const user = useSelector((state) => state.user)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchOrders() {
        const res = await fetch(`https://periwinkle-sea-lion-gear.cyclic.app/users/${user._id}/orders`)
        const data = await res.json()
        setOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        fetchOrders()
    }, [])
    return (
        <>
            {
                loading ? (
                    <div className="loading"> <Spinner animation="border" variant="primary" /> </div>
                ) : (
                    <>{
                        orders.length > 0 ? (
                            <div className="orderContainer">
                                <h3>Your Orders</h3>
                                <Table responsive striped bordered hover size="md">
                                    <thead>
                                        <tr>
                                            <th>OrderId</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr>
                                                <td>{order._id}</td>
                                                <td>
                                                    <Badge bg={`${order.status == "processing" ? "info" : "success"}`}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td>{order.date}</td>
                                                <td>₹{order.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>
                            </div>
                        ) : (
                            <h3>No Orders found</h3>
                        )
                    }</>
                )
            }
        </>
    )
}

export default Orders