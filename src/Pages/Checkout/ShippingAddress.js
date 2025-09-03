import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './Checkout.css';
import { Cart } from '../../Context/CartChangerContext';

function ShippingAddressForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [aptNumber, setAptNumber] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  // const [savingAddress, setSavingAddress] = useState(false);
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);

  console.log(products);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);
  
  const totalPrice = products.reduce((productsPrice, product) => {
    return productsPrice + Number(product.discount);
  }, 0);

  const productsCount = products.reduce((productCount, product) => {
    return productCount + Number(product.count);
  }, 0);

  const priceOfProductsOnly = totalPrice * productsCount;
  const shipping = 5;
  const beforeTax = (totalPrice * productsCount) + shipping;
  const taxCollected = 6;
  const orderTotal = beforeTax + taxCollected;

  const messageForUser =
    <div className='border rounded py-3 px-3 mb-4' style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      You will buy {products.length} products and the number of items from products you will buy is {productsCount} then the total price of products only without any shipping and taxes is {priceOfProductsOnly}
    </div>



  return (
    <Container className="d-flex py-4 px-0 flex-wrap ">
      {/* Shipping Address Card */}
      <Card style={{ flex: 1, borderColor: '#0d6efd' }} className="shipping-card border-2">
        <Card.Body>
          <Card.Title className="mb-3">Shipping Address</Card.Title>
          
          {/* Add New Address Radio */}
          <Form.Check
            type="radio"
            id="addNewAddress"
            label="Add New Address"
            name="addressOption"
            defaultChecked
            className="mb-3"
          />

          {/* Form Fields */}
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="streetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </Form.Group>

          {/* Address details without rows and cols */}
          <div className="d-flex mb-3" style={{ gap: '10px' }}>
            <Form.Group style={{ flex: 1 }} controlId="aptNumber">
              <Form.Label>Apt Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apt Number"
                value={aptNumber}
                onChange={(e) => setAptNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ flex: 1 }} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ flex: 1 }} controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
          </div>

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-5 row-gap-2 buttons">
            <Button className="cancel">Cancel</Button>
            <Button className="save">Save This Address</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Order Summary */}
      <Card style={{ flex: 0.5, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} className="order-card p-4">
        <div className="d-flex justify-content-between flex-column mb-3 gap-3 border-bottom">
          <Button variant="primary" className='w-100'>Place Order</Button>
          <p>By placing your order, you agree to our company Privacy policy and Conditions of use.</p>
        </div>
        <div>
          <h5>Order Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <div>Items ({products.length})</div>
            <div>{totalPrice * productsCount}</div>
          </div>
          {messageForUser}
          <div className="d-flex justify-content-between mb-2">
            <div>Shipping and handling</div>
            <div>{shipping}</div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div>Before tax:</div>
            <div>{ beforeTax }</div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div>Tax Collected:</div>
            <div>{ taxCollected}</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Order Total:</strong>
            <strong>{orderTotal }</strong>
          </div>
        </div>        
      </Card>
    </Container>
  );
}

export default ShippingAddressForm;