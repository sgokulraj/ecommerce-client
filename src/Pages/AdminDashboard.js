import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ProductsDashboard from '../Components/ProductsDashboard';
import OrdersAdmin from '../Components/OrdersAdmin';
import ClientsAdmin from '../Components/ClientsAdmin';

function AdminDashboard() {
    return (
        <Container className='my-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="products">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column text-center">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products"><ProductsDashboard /></Tab.Pane>
                            <Tab.Pane eventKey="orders"><OrdersAdmin /></Tab.Pane>
                            <Tab.Pane eventKey="clients"><ClientsAdmin /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container >
    )
}

export default AdminDashboard