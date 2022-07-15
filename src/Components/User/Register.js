import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { RegisterAction } from '../Actions/UserActions';

import { useDispatch, useSelector } from 'react-redux';
var FormData = require('form-data');


const Register = () => {
  const alert = useAlert()
  const navigate = useNavigate()

  
  const RegisterAuth= useSelector(state=> state.UserRegisterReducer)
  const dispatch = useDispatch()
  const [Data, setData] = useState({ name: '', email: '', password: '' })
  const [Preview, setPreview] = useState()

  useEffect(()=>{
     RegisterAuth && RegisterAuth.isAuthenticated && navigate('/')
  },[RegisterAuth])

  ///////////////HANDLE CHANGE///////////////////////////
  const handleChange = (e) => {


    if (e.target.name === 'Preview') {

      //FOR PREVIEW OF IMAGE 
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])

      reader.onloadend = () => {
        setPreview(reader.result)
      }

    } else {
      setData({ ...Data, [e.target.name]: e.target.value })
    }
  }

  /////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()
      formData.append('name', Data.name)
      formData.append('email', Data.email)
      formData.append('password', Data.password)
      formData.append('avatar', Preview)
      dispatch(RegisterAction(formData))
      alert.success('User Registered Successfully')
      navigate('/')
     } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">

          <form className="shadow-lg" encType='multipart/form-data' onSubmit={handleSubmit}>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input name='name' type="name" id="name_field" onChange={handleChange} className="form-control" value={Data.name} />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                onChange={handleChange}
                name='email'
                type="email"
                id="email_field"
                className="form-control"
                value={Data.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                onChange={handleChange}
                name='password'
                type="password"
                id="password_field"
                className="form-control"
                value={Data.password}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    {
                      Preview ? <img src={Preview} style={{ objectFit: "contain" }}></img> : <img
                        src={require('../Images/Avatar.png')}
                        className='rounded-circle'
                        alt='hello'
                      />
                    }

                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    name='Preview'
                    type='file'
                    onChange={handleChange}
                    accept="images/*"
                    className='custom-file-input'
                    id='customFile'


                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose avatar
                  </label>

                </div>
              </div>
            </div>

            <button
              disabled={ RegisterAuth && RegisterAuth.loading? true:false}
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              { RegisterAuth && RegisterAuth.loading? "LOADING":"REGISTER"}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Register