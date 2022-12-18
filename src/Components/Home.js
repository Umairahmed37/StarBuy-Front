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
// import FilteredProducts from './Product/FilteredProducts'

const Home = () => {


  const [Price, setPrice] = useState([1, 1000])

 
  const [Category, setCategory] = useState('')
  const Categories = ["Electronics", "Laptops", "Cameras", "Headphones", "Accessories","Food", "Books", "Cloths/Shoes", "Beuty/Health", "Sports","Outdoor","Home"]
  const [Rating, setRating] = useState(0)


  const { loading, products, error, totalProducts, prodperpage } = useSelector(state => state.productsReducer)

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

  }, [dispatch, error, alert, currentPage, keyword, reload, Category, Rating, reload]);




  function setCurrentPageno(pageNumber) {
    setcurrentPage(pageNumber)
  }


  return (
    <>
      <MetaData title="Home - Amazon" />
      <section id="products" className="mt-5 front-products">
        <h1 id="products_heading">Latest Products</h1>

        {

          keyword ?

            <div className="row sidebar">

              <div className="col-md-3 filter_sidebar">
                <PriceSlider
                  Price={Price}
                  setPrice={setPrice}
                  reload={reload}
                  setReload={setReload}
                />
                {/* CATEGORY + RATING */}
                <div className="mt-5">
                  <hr />
                  <h4 className="mt-0">Categories</h4>
                  <ul style={{ listStyleType: "none", cursor: "pointer" }} >
                    {
                      Categories.map(ele => (
                        <li onClick={() => setCategory(ele)} >{ele}</li>
                      ))


                    }
                    <li style={{ marginTop: '15px' }} onClick={() => setCategory('')}>No Category</li>

                  </ul>
                  <hr />
                  <h4 className="mt-0">Ratings</h4>
                  <ul style={{listStyleType:"none"}}>
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
                    <li onClick={()=>setRating(0)} style={{marginTop:"15px", cursor:"pointer"}}>Remove Rating</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9 ">
                <h3>Keyword : {keyword}
                {
                  Category && <span>,     Category: {Category}</span>
                }
               
                {
                  Rating!==0 ? <span>    Rating Above: {Rating + ' Star'}</span> : ""
                }
                 </h3>
                <div className='row'>

                  {
                    loading ?
                      <div className="row d-flex justify-content-center filterspinner">
                        <Spinner />
                      </div> :
                      <>

                        {products.length === 0 ? <h1>No Products found  </h1> :
                          products && products.map(product =>
                            <ProductItem key={product._id} product={product} col='4' />
                          )}
                      </>
                  }

                </div>

              </div>


              {/* <FilteredProducts
                      Price={Price}
                      setPrice={setPrice}
                    /> */}
            </div>

            //IF KEYWORD DOES NOT EXIST
            :
            <>
              {
                loading ?
                  <div className="row d-flex justify-content-center">
                    <Spinner />
                  </div> :
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

      {/* PAGINATION */}

      {
        prodperpage <= totalProducts &&
        <div className="mt-5 d-flex justify-content-center">
          {
            keyword && products.length < prodperpage ? "" :

              <Pagination

                activePage={currentPage}
                itemsCountPerPage={prodperpage}
                totalItemsCount={totalProducts}
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