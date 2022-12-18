import React, { Fragment } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { useSelector,useDispatch } from 'react-redux'
import { NewOrderAction } from '../Actions/OrderAction'

const ConfirmOrder = () => {

  const dispatch = useDispatch()
  const navigate= useNavigate()
  
  const { CartItems, ShippingInfo } = useSelector(state => state.Cart)
  const { User } = useSelector(state => state.UserLoginReducer)

  // Calculate Order Prices
  const itemsPrice = CartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 25
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)


  const processToPayment = () => {

    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
      orderItems: CartItems,
      userid: User._id,
      shippinginfo: ShippingInfo,
      paidAt: new Date().toISOString(),
    }
 
    sessionStorage.setItem('orderInfo', JSON.stringify(data))

    dispatch(NewOrderAction(data))
    navigate('/OrderSuccess')
  }

  return (
    <Fragment>


      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between px-5 mx-5">
        <div className="col-12 col-lg-8 mt-5 order-confirm">

          <h4 className="mb-3">Shipping Info</h4>
          <p><b>Name:</b> {User && User.name}</p>
          <p><b>Phone:</b> {ShippingInfo.Phone}</p>
          <p className="mb-4"><b>Address:</b> {`${ShippingInfo.Address}, ${ShippingInfo.City}, ${ShippingInfo.PostalCode}, ${ShippingInfo.Country}`}</p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {CartItems.map(item => (
            <Fragment key={item.id || item._id}>
              <hr />
              <div className="cart-item my-1" key={item.id}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>


                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                  </div>

                </div>
              </div>
              <hr />
            </Fragment>
          ))}



        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
            <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
            <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

            <hr />

            <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

            <hr />
            <button type='Submit' id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
          </div>
        </div>


      </div>

    </Fragment>
  )
}

export default ConfirmOrder
