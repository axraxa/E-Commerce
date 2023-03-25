import { useContext } from "react";
import { AppContextContainer } from "../context";
import { Link } from "react-router-dom";
import "./index.css";
import remove from "../assets/remove-item.png";
function Cart() {
  const { state, dispatch } = useContext(AppContextContainer);

  if (state.reduceStorage.length < 1) {
    return (
      <article className="goBackToProducts">
        <h1>You have not added any items in cart</h1>
        <Link to="/products" className="goBackToProducts-btn">
          Fill It
        </Link>
      </article>
    );
  }

  const shippingFee = 5.5;
  return (
    <section className="cartContainer">
      <article className="titles">
        <span>Item</span>
        <span>Price</span>
        <span style={{ padding: "0 10px" }}>Quantity</span>
        <span>Subtotal</span>
      </article>
      {state?.reduceStorage.map((product) => {
        const subtotal = product.price * product.ordered;
        const title = product.title;
        return (
          <article className="productCart" key={product.id}>
            <img src={product.image} alt={product.title} />
            <p className="price">${product.price}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  dispatch({ type: "DECREASE_CART", payload: product.id })
                }
              >
                -
              </button>
              <span>{product.ordered}</span>
              <button
                onClick={() =>
                  dispatch({ type: "INCREASE_CART", payload: product.id })
                }
              >
                +
              </button>
            </div>
            <p className="subtotal">${subtotal.toFixed(2)}</p>
            <img
              src={remove}
              alt="remove"
              className="remove-product"
              onClick={() =>
                dispatch({ type: "REMOVE_PRODUCT", payload: product.id })
              }
            />
          </article>
        );
      })}

      <div className="footerCart">
        <article className="totalMoney">
          <p>Subtotal : ${state.totalCartMoney}</p>
          <p>Shipping Fee : ${shippingFee}</p>
          <hr />
          <p>
            Total : $
            {parseFloat(state.totalCartMoney) + parseFloat(shippingFee)}
          </p>
        </article>

        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Clear Cart
        </button>
      </div>
    </section>
  );
}

export default Cart;
