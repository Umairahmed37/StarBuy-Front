
export const AddToCartAction = (product, Quantity) => async (dispatch, getState) => {



   try {
    let Data = {
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image || product.images[0].url,
      stock: product.stock,
      quantity: Quantity

    }
    dispatch({
      type: "ADD_TO_CART",
      payload: Data
    })

  } catch (error) {
    // dispatch({
    //   type: "RESET_PASS_FAILED",
    //   payload: error
    // })
    console.log(error);
  }

  localStorage.setItem("CartItems", JSON.stringify(getState().Cart.CartItems))
}



export const DeleteFromCart = (item) => async (dispatch, getState) => {

  dispatch({
    type: "DELETE_FROM_CART",
    payload: item
  })
  localStorage.clear()
  localStorage.setItem("CartItems", JSON.stringify(getState().Cart.CartItems))

}


export const AddShippingInfo = (Data) => async (dispatch, getState) => {

  dispatch({
    type: "ADD_SHIPPING_INFO",
    payload: Data
  })
   localStorage.setItem("ShippingInfo", JSON.stringify(getState().Cart.ShippingInfo))

}
