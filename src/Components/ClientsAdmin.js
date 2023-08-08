import { useEffect, useState } from "react"
import {  Spinner, Table } from 'react-bootstrap';

function ClientsAdmin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    async function getUsers() {
        const res = await fetch("https://periwinkle-sea-lion-gear.cyclic.app/users")
        const data = await res.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getUsers()
    }, [])

    return (
        <>
            {loading ? (<div className="loading">
                <Spinner animation="border" variant="primary" />
            </div>) : (
                <div>
                    {users?.length == 0 ? (<h3 className="text-center my-3">No users found</h3>) : (
                        <>
                            <Table responsive striped bordered hover size="md" className="text-center">
                                <thead>
                                    <tr>
                                        <th>CustomerId</th>
                                        <th>Customer Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ClientsAdmin