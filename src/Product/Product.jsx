import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContextContainer } from "../context";
import "./product.css";

function Product() {
  const activeProduct = useParams();
  const { state, dispatch } = useContext(AppContextContainer);

  useEffect(() => {
    if (state.data) {
      const product = state.data.find(
        (each) => each.id === parseInt(activeProduct.id)
      );
      dispatch({ type: "SHOW_PRODUCT", payload: product });
    }
  }, [activeProduct, state.loading]);

  if (state.loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }

  return (
    <section className="product-container">
      <img src={state.product.image} alt={state.product.title} />
      <section className="right-descriptions">
        <h1>{state.product.title}</h1>

        <h4>
          {state.product?.rating?.rate} rating out of &nbsp;
          {state.product?.rating?.count} customer reviews
        </h4>

        <h2 style={{ color: "red" }}>${state.product.price}</h2>
        <p style={{ color: "gray" }}>&nbsp;{state.product.description}</p>
        <h5>Category : {state.product.category}</h5>

        <div className="cart-count">
          <h1 onClick={() => dispatch({ type: "DECREASE" })}>-</h1>
          <p>{state.currentCount}</p>
          <h1 onClick={() => dispatch({ type: "INCREASE" })}>+</h1>
        </div>
        <button
          onClick={() =>
            dispatch({ type: "ADDING-TO-CART", payload: state.product })
          }
        >
          Add to Cart
        </button>
      </section>
    </section>
  );
}

export default Product;
