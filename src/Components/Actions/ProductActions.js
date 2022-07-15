import axios from 'axios'
import ErrorHandler from '../Utils/errorhandler'
import { useAlert } from 'react-alert'

export const getProducts = (keyword = '', currentPage = 1, Price, Category, Rating = 0) => async (dispatch) => {

  try {
    dispatch({ type: 'ALL_PRODUCTS_REQ' })
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${Price[1]}&price[gte]=${Price[0]}&rating[gte]=${Rating}`;

    if (Category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${Price[1]}&price[gte]=${Price[0]}&categories=${Category}&rating[gte]=${Rating}`;
    }

    const { data } = await axios.get(link)
    dispatch({ type: 'ALL_PRODUCTS_SUCCESS', payload: data })
  }

  catch (error) {
    dispatch({
      type: 'ALL_PRODUCT_FAIL',
      paylaod: error.response.data.message
    })
  }
}

export const getProductDetails = (id) => async (dispatch) => {

  try {

    dispatch({ type: 'PRODUCT_REQ' })
    const { data } = await axios.get(`/api/v1/getsingleproduct/${id}`)
    dispatch({ type: 'PRODUCT_SUCCESS', payload: data.product })
  }
  catch (error) {
    dispatch({
      type: 'PRODUCT_FAIL',
      paylaod: error.response.data.message
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}