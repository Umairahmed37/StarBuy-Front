import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../Actions/ProductActions'
import Metadata from '../Layouts/MetaData'
import Spinner from '../Utils/Spinner'

import { useState } from 'react'
import { Link } from "react-router-dom"
import { AddToCartAction } from '../Actions/CartActions'
import { useAlert } from 'react-alert'


const ProductDetails = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [])

  const [Quantity, setQuantity] = useState(1)
  const { product, loading } = useSelector(state => state.productDetails)
 

  const decQuantity = () => {
    const myvalue = document.querySelector('.count')
    if (myvalue.valueAsNumber <= 1) return
    setQuantity(Quantity - 1)
  }

  const incQuantity = () => {
    const myvalue = document.querySelector('.count')
    if (myvalue.valueAsNumber >= product.stock) return
    setQuantity(Quantity + 1)
  }

  const AddToCart = () => {
    dispatch(AddToCartAction(product, Quantity))
    alert.success('Cart Updated')
  }



  return (
    <>
      {loading ?
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
        : (

          <div>
            <Metadata title={product.name} />
            <div className="row f-flex justify-content-around">

              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div>
                  <Link to='/'> <button className="btn go-back-button" id="login_btn">Go back</button></Link>
                </div>
                <Carousel pause="hover">
                  {product.images && product.images.map(image => (
                    <Carousel.Item key={image.public_id}>
                      <img className="d-block w-100" src={image.url} alt={product.name} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name} </h3>
                <p id="product_id">{product._id}
                </p>

                <hr />

                <div className="rating-outer">
                  <div className="rating-inner"
                    style={{ width: Number(product.rating) / 5 * 108 }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.reviews && product.reviews.length} Reviews)</span>

                <hr />

                <p id="product_price">{product.price}$</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decQuantity}>-</span>

                  <input type="number" className="form-control count d-inline" value={Quantity} readOnly />

                  <span className="btn btn-primary plus" onClick={incQuantity}>+</span>
                </div>
                <button onClick={AddToCart} type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />

                <p>Status: <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status">
                  {product.stock > 0 ? "In Stock" : "Out OF Stock"}
                </span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller && product.seller}</strong></p>

                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                  Submit Your Review
                </button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">

                            <ul className="stars" >
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                              <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea name="review" id="review" className="form-control mt-3">

                            </textarea>

                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default ProductDetails