import React from "react";
import Cart from "./Cart.js";
import "./HeaderNav.css";
// import images from '../images';
export default function Navbar(props) {
  // const [displayNav, setDisplayNav] = React.useState(false);
  const [displayCloseButton, setDisplayCloseToggle] = React.useState(true);
  const [toggleCart, setToggleCart] = React.useState(false);
  function toggleNav() {
    setDisplayCloseToggle((display) => !display);
    document.querySelector('.nav').classList.toggle('active')
  }

  return (
    <div>
      <header className="flex main-header">
        <nav className="main-menu">
          {displayCloseButton && (
            <img
              onClick={toggleNav}
              className="toggleImages"
              alt=""
              src={`${process.env.PUBLIC_URL}/images/icon-menu.svg`}
            />
          )}
          {!displayCloseButton && (
            <img
              onClick={toggleNav}
              className="toggleImages"
              alt=""
              src={`${process.env.PUBLIC_URL}/images/icon-close.svg`}
            />
          )}
          <ul className="nav active">
            <li>
              <a href="#">Collection</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <span className="header--website-name">sneakers</span>
        </nav>
        <div className="flex header--side">
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/images/icon-cart.svg`}
            onClick={() => setToggleCart((prev) => !prev)}
          />
          <p className="cart--value">{props.cartValue}</p>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/images/image-avatar.png`}
          />
        </div>
      </header>
      {toggleCart && (
        <Cart
          cartValue={props.cartValue}
          setCartValue={props.setCartValue}
          setCartStock={props.setCartStock}
        />
      )}
    </div>
  );
}
