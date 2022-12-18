import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser, ProfileUpdate } from '../Actions/UserActions'

const UpdateProfile = () => {

  const { User } = useSelector(state => state.UserLoginReducer)
  const { isUpdated, loading } = useSelector(state => state.UpdateProfile)
  const dispatch = useDispatch()
  const Alert = useAlert()
  
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [AvatarPreview, setAvatarPreview] = useState('')
  const [Avatar, setAvatar] = useState('')


  useEffect(() => {
    if (User && User.name) {
      setName(User.name)
      setEmail(User.email)
      setAvatarPreview(User.avatar.url)
    }
  }, [])

  useEffect(() => {

    if(isUpdated===true){

      Alert.success("Updated Successfully")
      dispatch(loadUser())
       navigate('/me')

      dispatch({
        type:"USER_UPDATE_RESET"
      })
     }
  }, [isUpdated])




  const Handlechange = (e) => {

    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])

      reader.onloadend = () => {
        setAvatar(reader.result)
        setAvatarPreview(reader.result)
      }

    } catch (error) {
      console.log(error);
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('avatar', Avatar)
 
    dispatch(ProfileUpdate(formData))

   
  }



  return (


    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType='multipart/form-data' onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={AvatarPreview}
                      className='rounded-circle'
                      alt='Avatar Preview'
                    />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    onChange={Handlechange}

                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button type="submit"
              disabled={loading && 1}
              className="btn update-btn btn-block mt-4 mb-3" >Update</button>
          </form>
        </div>
      </div>

    </div>)
}

export default UpdateProfile