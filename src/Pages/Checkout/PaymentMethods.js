import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Checkout.css';

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [state, setState] = useState('');
  const [zipAddress, setZipAddress] = useState('');

  return (
    <>
      <Container className="p-4 w-100 border rounded col-lg-6 col-md-10 col-12 mt-5" >
        <h3 className="mb-3">Payment Method</h3>
        <Form>
          {/* Payment Type */}
          <Form.Check
            type="radio"
            id="creditDebit"
            label="Credit or Debit card"
            name="paymentType"
            defaultChecked
          />

          {/* Card Number */}
          <Form.Group className="mb-3" controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                maxLength={16}
                placeholder="•••• •••• •••• ••••"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="ms-2 bg-primary text-white px-3 py-2 rounded">
                VISA
              </div>
            </div>
          </Form.Group>

          {/* Expiry and CVC */}
          <div className="d-flex mb-3">
            <div style={{ flex: 1, marginRight: '10px' }}>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                maxLength={5}
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="password"
                maxLength={4}
                placeholder="•••"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>

          {/* ZIP code */}
          <Form.Group className="mb-3" controlId="zip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control
              type="text"
              maxLength={5}
              placeholder="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Form.Group>

          {/* Save card option */}
          <Form.Check
            type="checkbox"
            id="saveCard"
            label="Save this credit card for later use"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="mb-3"
          />

          {/* Billing address checkbox */}
          <Form.Check
            type="checkbox"
            id="billingAddress"
            label="Billing address same as shipping address"
            checked={sameAddress}
            onChange={(e) => setSameAddress(e.target.checked)}
            className="mb-3"
          />

          {/* Address Fields */}
          {!sameAddress && (
            <>
              <Form.Group className="mb-3" controlId="street">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex mb-3">
                <div style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>Apt Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apt Number"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1, margin: '0 10px' }}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip"
                    value={zipAddress}
                    onChange={(e) => setZipAddress(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-5 row-gap-2 buttons">
            <Button className="cancel">Cancel</Button>
            <Button className="save">Save This Address</Button>
          </div>
        </Form>
      </Container>
      <Container className='p-0'>
        <Form className='d-flex align-items-start justify-content-between flex-column gap-3 my-5 col-lg-7 col-md-10 col-12'>
          <div className='d-flex align-items-start justify-content-between border rounded py-3 px-3 w-100'>
            <Form.Check
              type="radio"
              id="Bitcoin"
              label="Bitcoin"
              name="Bitcoin"
            />
            <img
              src={require('../../Assets/Images/Icons/Payment Logo.png')}
              alt=''
              width="40px"
            />
          </div>
          <div className='d-flex align-items-start justify-content-between border rounded py-3 px-3 w-100'>
            <Form.Check
              type="radio"
              id="GooglePay"
              label="Google Pay"
              name="GooglePay"
            />
            <img
              src={require('../../Assets/Images/Icons/Payment Logo (1).png')}
              alt=''
              width="40px"
            />
          </div>
          <div className='d-flex align-items-start justify-content-between border rounded py-3 px-3 w-100'>
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              name="Paypal"
            />
            <img
              src={require('../../Assets/Images/Icons/Payment Logo (2).png')}
              alt=''
              width="40px"
            />
          </div>
        </Form>
      </Container>
    </>
  );
}

export default CreditCardForm;