import React, { useState } from 'react'
import { useEffect } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { AddShippingInfo } from '../Actions/CartActions'
import CheckoutSteps from './CheckoutSteps'
import { Link, Navigate, useNavigate } from 'react-router-dom'



const Shipping = () => {

  const countrylist = Object.values(countries)
  let { ShippingInfo } = useSelector(state => state.Cart)
 
  const navigate = useNavigate()

  const [Address, setAddress] = useState(ShippingInfo.Address || "")
  const [Phone, setPhone] = useState(ShippingInfo.Phone || "")
  const [City, setCity] = useState(ShippingInfo.City|| "")
  const [PostalCode, setPostalCode] = useState(ShippingInfo.PostalCode || "")
  const [Country, setCountry] = useState(ShippingInfo.Country || "")

  const dispatch = useDispatch()

  //Send User Shipping details
  const handleSubmit = (e) => {
    e.preventDefault()
 
    
    dispatch(AddShippingInfo({ Address, City, Phone, PostalCode, Country }))
    navigate('/ConfirmOrder')
  }


  return (
    <div>
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={Address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={City}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlhtmlFor="phone_field">Phone No</label>
              <input
                type="number"
                id="phone_field"
                className="form-control"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={PostalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {
                  countrylist.map(C => (

                    <option key={C.name} value={C.value} required>
                      {C.name}
                    </option>
                  ))
                }

              </select>
            </div>
            {/* <Link to="/ConfirmOrder"> */}
              <button
                id="shipping_btn"
                type="Submit"
                className="btn btn-block py-3"
              >
                CONTINUE
              </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping