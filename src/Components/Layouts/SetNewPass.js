import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NewPassword } from '../Actions/UserActions'

const SetNewPass = () => {


  const { token } = useParams()
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading,updated } = useSelector(state => state.ForgotPassReducer);

  const [password, setpassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')


  useEffect(()=>{

    if(updated){
      alert.success("Password Updated Successfully")
      navigate('/Login')
    }
  },[updated])

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPass) {
      return alert.error("Please Fill All Fields")
    }

 
    const formData = new FormData()
    formData.append("password", password)
    formData.append("confirmPassword", confirmPass)
 
    dispatch(NewPassword(token, formData))

  }

  return (
    <div class="container-container-fluid">
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form class="shadow-lg" onSubmit={handlesubmit}>
            <h1 class="mb-3">New Password</h1>

            <div class="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}

              />
            </div>

            <div class="form-group">
              <label for="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                class="form-control"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}

              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              disabled={loading && 1}
              class="btn btn-block py-3">
              Set Password
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default SetNewPass