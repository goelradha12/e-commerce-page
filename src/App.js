import './App.css';
import Main from './components/Main.js';
import Navbar from './components/Navbar.js';
import React from 'react'
function App() {
  const [cartStock, setCartStock] = React.useState(0);
  const [cartValue, setCartValue] = React.useState(0);

  function handleCartMinus(e) {
    e.preventDefault();
    if (cartStock == 0) {
      return false
    }
    setCartStock(cart => cart - 1)
    // return false;
  }
  function handleCartPlus(e) {
    e.preventDefault();
    setCartStock(cart => cart + 1)
    // return false;
  }
  
  function updateCartStock(e) {
    e.preventDefault();
    setCartValue(cartStock);
    window.scrollTo(0,0)
  }
  return (
    <>
      <Navbar cartValue={cartValue} updateCartStock={updateCartStock} setCartValue={setCartStock} setCartStock={setCartValue}/>
      <Main cartStock={cartStock} setCartStock={setCartStock} updateCartStock={updateCartStock} handleCartMinus = {handleCartMinus} handleCartPlus={handleCartPlus} />
    </>
  );
}

export default App;
