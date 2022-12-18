import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Logout } from '../Actions/UserActions'
import Search from './Search'


const Header = () => {


  const alert = useAlert()
  const dispatch = useDispatch()
  const { CartItems } = useSelector(state => state.Cart)
  const Loggedin = useSelector(state => state.UserLoginReducer)

  const [Reload, setReload] = useState(false)



  useEffect(() => {
    setReload(!Reload)
  }, [Loggedin.User, dispatch, Loggedin.isAuthenticated])


  //logout
  const LogoutFunction = () => {
    dispatch(Logout())
    alert.success("Logged out successfully")
  }


  // const logout = () => {
  //   window.location.reload()
  // }

  return (
    <>
      <nav className="navbar row">

        {/* LOGO */}
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to='/'>
              <img alt="amazon" src={require('../Images/amazon.png')} width="250" height="40" />
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />

        </div>

        {/* CART+LOGIN */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

          <Link className="cartlink" to="/cart">
            <span id="cart" className="ml-3" style={{ textDecoration: "none" }}>Cart</span>
            <span className="ml-1" id="cart_count">{CartItems && CartItems.length}</span>
          </Link>

          {
            Loggedin.User && Loggedin.User.name ?

              <div className="ml-3 dropdown d-inline">
                <Link to="#!" className="btn dropdown-toggle text-white"
                  type="button" id="dropDownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <figure className="avatar avatar-nav">

                    <img
                      className="rounded-circle"


                      src={Loggedin.User.avatar && Loggedin.User.avatar.url}




                      alt={Loggedin.User && Loggedin.User.name}
                    ></img>
                  </figure>
                  <p style={{ paddingTop: "4px" }}>{Loggedin.User && Loggedin.User.name}</p>

                </Link>


                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                  {
                    Loggedin.User && Loggedin.User.role !== 'admin' ?
                      <Link className="dropdown-item" to="/Orders/me">Orders</Link> :
                      <Link className="dropdown-item" to="/Dashboard">Dashboard</Link>

                  }

                  <Link className="dropdown-item" to="/me">Profile</Link>

                  <Link onClick={LogoutFunction} className="dropdown-item text-danger" to="/">Logout</Link>

                </div>

              </div>

              :
              <>
                <Link to="/Login">
                  <button
                    disabled={Loggedin && Loggedin.loading ? 1 : 0}
                    className="btn ml-4"
                    id="login_btn">Login</button>
                </Link>
                <Link className='text-white ml-3' to="/Register">Register</Link>
              </>

          }
          {/* {
            Loggedin.User.name ? <button onClick={logout} className="btn ml-3" id="login_btn">Logout</button>
              
              :
              <Link to="/Login"><button className="btn" id="login_btn">Login</button></Link>
          } */}



        </div>
      </nav>
    </>
  )
}

export default Header