import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddToCartAction, DeleteFromCart } from '../Actions/CartActions'

const Cart = () => {

  const [NewQuan, setNewQuan] = useState()
  const { CartItems } = useSelector(state => state.Cart)
 
  const dispatch = useDispatch()

  function decQuantity(i, quantity) {
    if (quantity <= 1) return
    const NewQuan = quantity - 1;
    dispatch(AddToCartAction(i, NewQuan))
  }

  function incQuantity(i, quantity, stock) {
    if (quantity >= stock) return
    const NewQuan = quantity + 1;
    dispatch(AddToCartAction(i, NewQuan))
  }

  function DeleteItem(item) {
    dispatch(DeleteFromCart(item))
  }

  return (
    <>
      <div>
        <div className="container container-fluid">
          <h2 className="mt-5">Your Cart: <b>{CartItems.length} Items</b></h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              <hr />
              {
                CartItems.length >= 1 ? CartItems.map(item =>
                  <div className="cart-item" key={item.id}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={item.image} alt="Laptop" height="90" width="115" />
                      </div>

                      <div className="col-5 col-lg-3">
                        <a href="#">{item.name}</a>
                      </div>


                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus"
                            onClick={() => decQuantity(item, item.quantity)}
                          >-</span>
                          <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                          <span className="btn btn-primary plus"
                            onClick={() => incQuantity(item, item.quantity, item.stock)}
                          >+</span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => DeleteItem(item)}></i>
                      </div>

                    </div>
                  </div>
                ) : <div><h4>Your Cart is Empty</h4></div>
              }
              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">
                  {CartItems.reduce((sum, i) => sum + i.quantity, 0)}
                  (Units)
                </span></p>
                <p>Est. total: <span className="order-summary-values">
                  ${CartItems.reduce((sum, i) => sum + i.price*i.quantity, 0)}

                </span></p>

                <hr />
                <Link to="/Shipping"><button id="checkout_btn" className="btn btn-primary btn-block" >Check out</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Cart