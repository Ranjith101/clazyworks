import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 19.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 24.99,
    image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 29.99,
    image: 'https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Dashboard = () => {
  const vendor_details = useSelector((state) => state.user);

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>My Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>Welcome, {vendor_details.firstname}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Item 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Item 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Item 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Item 4</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Item 5</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>User Information</h5>
              <p>Email: {vendor_details.email}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <h5>Product Showcase</h5>
              <Row>
                {dummyProducts.map((product) => (
                  <Col key={product.id} md={4} sm={6} className='mb-3'>
                    <Card>
                      <Card.Img variant="top" src={product.image} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>Price: ${product.price}</Card.Text>
                        <Button  onClick={()=>window.open("https://www.amazon.com")}>BuyNow</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
