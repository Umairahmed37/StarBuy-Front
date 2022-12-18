import axios from 'axios'

export const NewOrderAction = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: "CREATE_ORDER_REQUEST" })

        const { data } = await axios.post('/api/v1/order/new', order)

        dispatch({
            type: "CREATE_ORDER_SUCCESS",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "CREATE_ORDER_FAIL",
            payload: error.response.data.message
        })
    }
}

export const GetOrdersAction = () => async (dispatch) => {

    try {

        dispatch({ type: "GET_ORDER_R" })

        const { data } = await axios.get('/api/v1/orders/me')
        // console.log(data.order);
        dispatch({
            type: "GET_ORDER_S",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "GET_ORDER_F",
            payload: error.response.data.message
        })
    }
}

export const GetSingleOrder = (Oid) => async (dispatch) => {

    try {

        dispatch({ type: "SINGLE_ORDER_R" })

        const { data } = await axios.get(`/api/v1//order/${Oid}`)
        dispatch({
            type: "SINGLE_ORDER_S",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "SINGLE_ORDER_F",
            payload: error.response.data.message
        })
    }
}