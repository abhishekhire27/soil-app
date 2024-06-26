import React, { useState } from "react";
import Button from "../layouts/Button";
import "./CardDetailsModal.css";
import { useToast } from "../../components/Toaster/ToastContext";
import useCarts from "../../hooks/useCart";
import { useAuth } from '../../components/auth/AuthProvider';
import { useNavigate } from "react-router-dom";
import { emptyCartBackend } from "../../services/cart.services";

const CardDetailsModal = ({ isOpen, onClose, total }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const { addToast } = useToast();
  const navigate = useNavigate();
  const { cartData } = useCarts();
  const { user } = useAuth();

  async function emptyCart(){
    try{
      await emptyCartBackend(user.cartId);
      return true;
    }
    catch(error){
      return false;
    }
    
  }

  const validateCardDetails = () => {
    let isValid = true;

    if (!/^\d{16}$/.test(cardNumber)) {
      setCardNumberError("Please enter a valid 16-digit card number");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
      setExpiryError(
        "Please enter a valid expiry date in MM/YY format........."
      );
      isValid = false;
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const daysInMonth = new Date(2000 + year, month, 0).getDate();

      if (month < 1 || month > 12) {
        setExpiryError("Invalid month");
        isValid = false;
      } else if (
        year < currentYear ||
        (year === currentYear && month < new Date().getMonth() + 1)
      ) {
        setExpiryError("Expiry date cannot be in the past");
        isValid = false;
      } else if (daysInMonth < 31 && expiry.endsWith("/31")) {
        setExpiryError("Invalid expiry date for the selected month");
        isValid = false;
      } else {
        setExpiryError("");
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      setCvvError("Please enter a valid 3-digit CVV");
      isValid = false;
    } else {
      setCvvError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCardDetails()) {
      const cartEmpty = emptyCart();
      if(!cartEmpty){
        addToast("Error while placing your order");
      }
      else{
        addToast("Your order has been successfully placed");
        navigate("/summary", { state: { cartData, total } });
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal">
      <h2>Enter your card details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Card Number:</label>
          <input
            type="number"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {cardNumberError && (
            <p className="error-message" style={{ color: "red" }}>
              {cardNumberError}
            </p>
          )}
        </div>
        <div className="form-group mt-2">
          <label>Expiry date:</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          {expiryError && (
            <p className="error-message" style={{ color: "red" }}>
              {expiryError}
            </p>
          )}
        </div>
        <div className="form-group mt-2">
          <label>CVV:</label>
          <input
            type="number"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          {cvvError && (
            <p className="error-message" style={{ color: "red" }}>
              {cvvError}
            </p>
          )}
        </div>
        <div className="button-container d-flex flex-row">
          <Button buttonName="Pay" type="submit" />
          <Button
            buttonName="Close"
            type="button"
            onClick={onClose}
            style={{ backgroundColor: "red" }}
          />
        </div>
      </form>
    </div>
  );
};

export default CardDetailsModal;
