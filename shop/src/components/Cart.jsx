import { useOutletContext } from "react-router-dom";
import "../styles/cart.scss";

export default function Cart() {
  const [data, cart, setCart] = useOutletContext();

  // Function to calculate total price of items in cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    return totalPrice.toFixed(2); // Ensure total price is formatted to 2 decimal places
  };

  // Function to handle adding an item to cart
  const handleAddItem = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count++;
    setCart(updatedCart);
  };

  // Function to handle deducting an item from cart
  const handleDeductItem = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].count > 1) {
      updatedCart[index].count--;
      setCart(updatedCart);
    }
  };

  return (
    <section className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="item-info">
                <div
                  className="item-image"
                  style={{ backgroundImage: `url(${item.src})` }}
                ></div>
                <div className="item-details">
                  <p className="item-title">{item.title}</p>
                  <p className="item-price">{`$ ${item.price}`}</p>
                </div>
              </div>
              <div className="item-actions">
                <div className="item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => handleDeductItem(index)}
                  >
                    -
                  </button>
                  <p className="item-count">{item.count}</p>
                  <button
                    className="quantity-button"
                    onClick={() => handleAddItem(index)}
                  >
                    +
                  </button>
                </div>
                <p className="item-total">{`$ ${item.price * item.count}`}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <p className="total">Total: ${calculateTotalPrice()}</p>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      )}
    </section>
  );
}