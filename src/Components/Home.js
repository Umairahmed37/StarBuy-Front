import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MetaData from './Layouts/MetaData'



import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { getProducts } from './Actions/ProductActions'
import ProductItem from './Product/ProductItem'
import Spinner from './Utils/Spinner'

// const Slider = require('rc-slider');
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

import "rc-slider/assets/index.css"
import PriceSlider from './Utils/PriceSlider'

const Home = () => {


  const [Price, setPrice] = useState([1, 1000])
  const [Category, setCategory] = useState('')
  const Categories = ["Electronics", "Laptop", "Camera", "Headphones"]
  const [Rating, setRating] = useState(0)

  const { loading, products, error, ProductCount, prodperpage } = useSelector(state => state.productsReducer)

  const [currentPage, setcurrentPage] = useState(1)
  const params = useParams()
  const alert = useAlert()
  const dispatch = useDispatch()
  const keyword = params.keyword

  const [reload, setReload] = useState(false)

  //USE EFFECT--------------------------------------
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, Price, Category, Rating))
  }, [dispatch, error, alert, currentPage, keyword, reload, Category, Rating]);
  //USE EFFECT--------------------------------------

  function setCurrentPageno(pageNumber) {
    setcurrentPage(pageNumber)
  }


  return (
    <>
      <MetaData title="Home - Amazon" />
      <section id="products" className="mt-5 front-products">
        <h1 id="products_heading">Latest Products</h1>
        {
          loading ?
            <div className="row d-flex justify-content-center">
              <Spinner />
            </div>
            :
            <>
              {
                keyword ?

                  <div className="row sidebar">
                    <div className="col-md-3 filter_sidebar">
                      <PriceSlider
                        Price={Price}
                        setPrice={setPrice}
                        reload={reload}
                        setReload={setReload} />
                      <div className="mt-5">
                        <hr />
                        <h4 className="mt-5">Categories</h4>
                        <ul style={{ listStyleType: "none", cursor: "pointer" }} >
                          {
                            Categories.map(ele => (
                              <li onClick={() => setCategory(ele)} >{ele}</li>
                            ))

                          }
                        </ul>
                        <hr />
                        <h4 className="mt-5">Ratings</h4>
                        <ul>
                          {
                            [5, 4, 3, 2, 1].map(star => (
                              <li onClick={() => setRating(star)} style={{ listStyleType: "none", cursor: "pointer" }}>
                                <div className="rating-outer">
                                  <div className="rating-inner" style={{
                                    width: `${star * 20}%`
                                  }}></div>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>



                    </div>
                    <div className="col-md-9 row">
                      {products.length === 0 ? <h1>No Products found  </h1> :
                        products.map(product =>
                          <ProductItem key={product._id} product={product} col='4' />
                        )}
                    </div>
                  </div>

                  :
                  <div className="row">
                    {products.length === 0 ? <h1>No Products found  </h1> :
                      products.map(product =>
                        <ProductItem key={product._id} product={product} col='3' />
                      )}
                  </div>
              }
            </>
        }

      </section>

      {
        prodperpage <= ProductCount &&
        <div className="mt-5 d-flex justify-content-center">
          {
            keyword && products.length < prodperpage ? "" :

              <Pagination

                activePage={currentPage}
                itemsCountPerPage={prodperpage}
                totalItemsCount={ProductCount}
                onChange={setCurrentPageno}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"

              />}
        </div>
      }


    </>
  )
}

export default Home