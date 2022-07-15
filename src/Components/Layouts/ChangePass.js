import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChangePassword, loadUser } from '../Actions/UserActions'

const ChangePass = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()


  const { ChangePassError, isUpdated, loading } = useSelector(state => state.ChangePassReducer)

  useEffect(() => {
    if (ChangePassError) {

      alert.error("Incorrent Old Password")
      // dispatch({
      //   type: "CLEAR_ERROR"
      // })
    }
  }, [ChangePassError]);


  useEffect(() => {

    if (isUpdated === true) {
      navigate('/')
      dispatch({
        type: "CHANGE_PASS_RESET"
      })
      alert.success("Password Updated Successfully")
    }
  }, [isUpdated]);

  const [OldPassword, setOldPassword] = useState('')
  const [Password, setPassword] = useState('')


  const handleSubmit = (e) => {

    e.preventDefault()

    if (OldPassword == "" || Password == "") {
      return alert.error("Please enter all fields")
    }

    const formData = new FormData()
    formData.append('oldPassword', OldPassword)
    formData.append('password', Password)

    dispatch(ChangePassword(formData))
    dispatch(loadUser())

  }

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={OldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading && 1} className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default ChangePass