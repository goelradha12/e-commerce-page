import React from 'react'
import './cart.css'

export default function Cart(props) {

    return (
        <div className='cart-popup'>
            <h1>Cart</h1>
            <hr>
            </hr>
            <br />
            {props.cartValue == 0 ? <h2>Your cart is empty</h2> :
                <div>
                    <div className='flex--cart'>
                        <div className='flex--cart'>
                            <img className='popup--image' alt="" src={`${process.env.PUBLIC_URL}/images/image-product-1-thumbnail.jpg`} />
                            <div>
                                <h2>
                                    Fall Limited Edition Sneakers
                                </h2>
                                <span>$125 * </span>
                                <span>{props.cartValue} </span>
                                <span className='payable-amount'>{`$${125 * (props.cartValue)}`}</span>
                            </div>
                        </div>
                        <img
                            className='delete-cart-item'
                            onClick={() => {
                                console.log(props)
                                props.setCartValue(0)
                                props.setCartStock(0)
                            }}
                            alt=""
                            src={`${process.env.PUBLIC_URL}/images/icon-delete.svg`}></img>
                    </div>
                    <button className="product-cart--button">Checkout</button>
                </div>
            }
        </div>
    )
}