
export const AddToCartAction = (product, Quantity) => async (dispatch, getState) => {

  try {
    let Data = {
      id:product._id,
      name:product.name,
      price:product.price,
      image:product.images[0].url,
      stock:product.stock,
      quantity:Quantity
  
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
    console.log(JSON.stringify(localStorage.getItem("CartItems")));
}
 