import { useContext, useRef } from "react";
import "./index.css";
import { AppContextContainer } from "../context";
import { Link } from "react-router-dom";

function Products() {
  const { state, dispatch } = useContext(AppContextContainer);
  const ref = useRef(0);

  function handleClick(index) {
    const updatedCategories = state.categories.map((each, i) => {
      if (index == i) {
        each.status = "selected";
        return each;
      }
      each.status = "null";
      return each;
    });
    dispatch({
      type: "CATEGORY_CHANGE",
      payload: { categories: updatedCategories, id: index },
    });
  }
  return (
    <section className="product-list">
      <header>
        <div alt="left-side">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) =>
              dispatch({ type: "SEARCHING_PRODUCT", payload: e.target.value })
            }
          />
          <h3>{state.updatedSearch.length} products found</h3>
        </div>
        <hr />
        <select
          id="sort-input"
          ref={ref}
          onChange={() =>
            dispatch({ type: "SORT_CHANGE", payload: ref.current?.value })
          }
        >
          <option value="Lowest">Price (Lowest)</option>
          <option value="Highest">Price (Highest)</option>
          <option value="A-Z">Name (A-Z)</option>
          <option value="Z-A">Name (Z-A)</option>
        </select>
      </header>
      <main>
        <section className="left-side-categories">
          <ul>
            {state.categories.map((each, index) => {
              return (
                <li
                  onClick={() => handleClick(index)}
                  className={each.status}
                  key={index}
                >
                  {each.category.toUpperCase()}
                </li>
              );
            })}
          </ul>
          <div className="price-section">
            <h1>Price</h1>
            <span>${state.currentPrice}</span>
            <br />
            <input
              className="slide-bar"
              type="range"
              value={state.sideBarDefaultValue}
              onChange={(e) => {
                dispatch({ type: "PRICE_CHANGE", payload: e.target.value });
              }}
            />
          </div>
        </section>
        <section className="right-side-products">
          {state.updatedSearch.length >= 1 &&
            state.updatedSearch.map((each) => {
              return (
                <div className="products-product" key={each.id}>
                  <img src={each.image} alt={each.title} />
                  <div className="right-side-product">
                    <div>
                      <h2 className="title-product">{each.title}</h2>
                      <p>Price : ${each.price}</p>
                      <p className="description-product">
                        {each.description.slice(0, 200)}...
                      </p>
                    </div>
                    <Link
                      to={`/products/${each.id}`}
                      style={{ width: "fit-content" }}
                    >
                      <button>Details</button>
                    </Link>
                  </div>
                </div>
              );
            })}

          {state.updatedSearch.length == 0 && (
            <h1>Sorry, no products matched your search.</h1>
          )}
        </section>
      </main>
    </section>
  );
}

export default Products;
