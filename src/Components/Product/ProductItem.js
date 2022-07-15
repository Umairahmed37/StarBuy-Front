import React from 'react'
import { Link } from 'react-router-dom'



const ProductItem = ({ product ,col }) => {


  return (
    <>

        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
          <div className="card p-3 rounded">
            <Link to={`/Product/${product._id}`}>
            <img
              alt="the logo"
              className="card-img-top mx-auto"
              src={product.images[0].url}
              />
              </Link>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/Product/${product._id}`}>
                  {product.name}
                </Link>
              </h5>
              <p className="text-muted">
                {
                  product.description.substr(0, 50) + '...'
                }
              </p>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner"
                    style={{ width: product.rating / 5 * 108 }} >
                  </div>
                </div>
                <span id="no_of_reviews">
                  {
                    product.reviews.length === 1 ?
                      '1 review' :
                      product.reviews.length + ' reviews'
                  }

                </span>
              </div>
              <h6>{product.categories}</h6>
              <p className="card-text">{product.price}$/-</p>
              <Link to={`/Product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
      

      

    </>
  )
}

export default ProductItem