import { useContext } from "react";
import cart from "../assets/cart.png";
import close from "../assets/remove.png";
import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
import "./navbar.css";

import { AppContextContainer } from "../context";

function Navbar() {
  const { state, dispatch } = useContext(AppContextContainer);
  return (
    <nav>
      <Link to="/home" className="nav-left">
        E-<span>C</span>ommerce
      </Link>
      <div className="nav-center">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
          Cart
        </Link>
        <Link to="/cart">
          <img src={cart} alt="cart" id="cart" />
        </Link>
        <div className="total-counter">
          {state?.totalCart <= 9 ? state?.totalCart : "+9"}
        </div>
      </div>
      <img
        src={menu}
        alt="menu"
        className="hamburger"
        onClick={() => dispatch({ type: "sideBarManipulation" })}
      />
      <Sidebar />
    </nav>
  );
}

function Sidebar() {
  const { state, dispatch } = useContext(AppContextContainer);
  return (
    <div className={`sidebar ${state.sideBarShown && "toggle"}`}>
      <header style={{ padding: "10px 30px 0 30px" }}>
        <p className="nav-left">E-Commerce</p>
        <img
          src={close}
          alt="close"
          onClick={() => dispatch({ type: "sideBarManipulation" })}
          style={{ cursor: "pointer" }}
        />
      </header>
      <ul>
        <li>
          <Link
            to="/home"
            onClick={() => dispatch({ type: "sideBarManipulation" })}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={() => dispatch({ type: "sideBarManipulation" })}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => dispatch({ type: "sideBarManipulation" })}
          >
            Products
          </Link>
        </li>
      </ul>
      <div className="menuCart">
        <div className="cart">
          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => dispatch({ type: "sideBarManipulation" })}
          >
            Cart
          </Link>
          <Link to="/cart">
            <img
              src={cart}
              alt="cart"
              id="cart"
              onClick={() => dispatch({ type: "sideBarManipulation" })}
            />
          </Link>

          <div className="total-counter">
            {state?.totalCart <= 9 ? state?.totalCart : "+9"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
