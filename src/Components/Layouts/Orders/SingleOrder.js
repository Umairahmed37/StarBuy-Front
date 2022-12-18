import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { GetSingleOrder } from '../../Actions/OrderAction'

const SingleOrder = () => {

  const params = useParams()
  const dispatch = useDispatch()

  // const {} = useSelector(state=>state.)

  useEffect(() => {
    dispatch(GetSingleOrder(params.id))
  })


  
  

  return (
    <div class="container container-fluid">

      <h1 class="mt-5">Order # 4543f34f545</h1>
      <hr />

      <div class="col-12 row  order-details">
        <div className="col-md-6">

          <h4 class="mb-3 ">Shipping Info</h4>
          <p><b>Name:</b> John</p>
          <p><b>Phone:</b> 111 111 1111</p>
          <p class="mb-3"><b>Address:</b>Address of user</p>
          <p><b>Amount:</b> $1111</p>
        </div>

        <div className="col-md-6">
          <h4 class="my-">Payment</h4>
          <p class="greenColor" ><b>PAID</b></p>


          <h4 class="my-4">Order Status:</h4>
          <p class='greenColor' ><b>Delivered</b></p>


          <h4 class="my-4">Order Items:</h4>
        </div>
      </div>





<hr />
      <div class="cart-item my-1 col-md-6">
        <div class="row my-5">
          <div class="col-4 col-lg-2">
            <img src='' alt="Laptop" height="45" width="65" />
          </div>

          <div class="col-5 col-lg-5">
            <a href="#">Mic</a>
          </div>


          <div class="col-4 col-lg-2 mt-4 mt-lg-0">
            <p>$33</p>
          </div>

          <div class="col-4 col-lg-3 mt-4 mt-lg-0">
            <p>2 Piece(s)</p>
          </div>
        </div>
      </div>

    </div>



  )
}

export default SingleOrder