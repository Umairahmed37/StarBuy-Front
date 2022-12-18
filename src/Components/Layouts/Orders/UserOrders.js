import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { GetOrdersAction } from '../../Actions/OrderAction'
import { Link } from 'react-router-dom'




const UserOrders = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { Orders, loading, } = useSelector(state => state.MyOrders)

  useEffect(() => {
    dispatch(GetOrdersAction())
  }, [])

  const setOrders = () => {

    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Num of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        },
      ],
      rows: []
    }
    Orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`, 
        status: 
           
        order.orderStatus && String(order.orderStatus).includes('Delivered')
          ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
          : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions:
          <Link to={`/Order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
      })
    })
    return data

  }


  return (

    <div>
      {
        loading ? (
          <div>
            <h1 className='text-center mt-5'>Loading</h1>
          </div>
        ) : (
          Orders.length>=0 ?
          <div className='container mt-5 p-2 px-2'>
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          </div>:<h1> No Orders to Display</h1>
        )
      }
    </div>
  )
}

export default UserOrders