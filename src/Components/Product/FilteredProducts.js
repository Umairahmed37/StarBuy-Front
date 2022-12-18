import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductItem from '../Product/ProductItem';
import { getProducts } from '../Actions/ProductActions'




const FilteredProducts = () => {

  const params = useParams()
  const alert = useAlert()
  const dispatch = useDispatch()
  const keyword = params.keyword

  const { loading, products, error, totalProducts, prodperpage } = useSelector(state => state.productsReducer)

  // const [Price, setPrice] = useState([1, 1000])
  const [Category, setCategory] = useState('')
  const [Rating, setRating] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const [reload, setReload] = useState(false)

  const Categories = ["Electronics", "Laptop", "Camera", "Headphones"]




  // useEffect(() => {
  //   if (error) {
  //     return alert.error(error)
  //   }
  //   dispatch(getProducts(keyword, currentPage, Price, Category, Rating))

  // }, [dispatch, error, alert, currentPage, keyword, reload, Category, Rating, reload]);


  return (
    <div className="col-md-9 row">
      {products.length === 0 ? <h1>No Products found  </h1> :
        products && products.map(product =>
          <ProductItem key={product._id} product={product} col='4' />
        )}
    </div>
  )
}

export default FilteredProducts