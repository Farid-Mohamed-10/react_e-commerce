import { Container } from "react-bootstrap";
import './Checkout.css';
import CreditCardForm from "./PaymentMethods";
import ShippingAddressForm from "./ShippingAddress";
import Cookie from 'cookie-universal';

export default function Checkout() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return (
    <div>
      {token ? (
        <Container className="mt-3">
        <ShippingAddressForm />
        <CreditCardForm />
      </Container>
      ) : (
        window.location.pathname = "/login"
      )}
    </div>
    
  );
}