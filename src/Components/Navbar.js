import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import bootstrap from "bootstrap";
import { Link } from 'react-router-dom';
import "../Stylesheets/Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { Button, CarouselItem } from 'react-bootstrap';
import { setLogout } from '../ReduxState/UserSlice';
import Badge from 'react-bootstrap/Badge';
import { HiShoppingCart } from "react-icons/hi"


function NavBar() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()


    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand><Link to="/" className='navbarLink h2'>ShopKart</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <Nav.Link><Link to="/login" className='navbarLink'>Login</Link></Nav.Link>
                        )}

                        {user && !user.isAdmin && (
                            <Nav.Link><Link to="/cart" className='navbarLink'>
                                <HiShoppingCart style={{ fontSize: "25px" }} />
                                {user?.cart.count > 0 && (
                                    <Badge bg="warning" text="dark">
                                        {user?.cart.count}
                                    </Badge>
                                )}
                            </Link></Nav.Link>
                        )}
                        {user && (
                            <NavDropdown title={`${user.username}`} id="basic-nav-dropdown" className='navbarLink'  align={{ xs: 'start' }}>
                                {user.isAdmin ? (
                                    <>
                                        <NavDropdown.Item >
                                            <Link to='/admin' className='navbarLink'>
                                                Dashboard
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item >
                                            <Link to='/createProduct' className='navbarLink'>
                                                Create Product
                                            </Link>
                                        </NavDropdown.Item>

                                    </>
                                ) :
                                    (
                                        <>
                                            <NavDropdown.Item><Link to='/cart' className='navbarLink'>Cart</Link></NavDropdown.Item>
                                            <NavDropdown.Item >
                                                <Link to='/orders' className='navbarLink'>
                                                    Orders
                                                </Link>
                                            </NavDropdown.Item>

                                        </>
                                    )}
                                <NavDropdown.Divider />
                                <Button variant="primary" style={{ margin: "0 auto", display: "block" }} onClick={() => {
                                    dispatch(setLogout())
                                    alert("Logout successful")
                                }} >
                                    Logout
                                </Button>
                            </NavDropdown>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar