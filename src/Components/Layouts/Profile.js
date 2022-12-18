import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {


  const dispatch = useDispatch()
  let { User, loading } = useSelector(state => state.UserLoginReducer)
  let { isUpdated } = useSelector(state => state.UpdateProfile)




  return (

    loading ? <div className="m-5 p-5 mt-5 text-center"> <h1>LOADING</h1></div> : <div className="container container-fluid">
      <h2 className="mt-5 ml-5">My Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className='avatar avatar-profile'>
            <img className="rounded-circle img-fluid" src={User.name && User.avatar.url} alt='' />
          </figure>

          <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
            Edit Profile
          </Link>

        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{User.name && User.name}</p>

          <h4>Email Address</h4>
          <p>{User.name && User.email}</p>

          <h4>Joined On </h4>
          <p>{String(User.name && User.createdAt).substring(0, 10)}</p>


          {
            User.role === "admin" && <Link to="/Orders/me" className="btn btn-danger btn-block mt-5">
              My Orders
            </Link>
          }


          <Link to='/Password/update' className="btn btn-primary btn-block mt-3">
            Change Password
          </Link>

        </div>
      </div>
    </div>


  )
}

export default Profile