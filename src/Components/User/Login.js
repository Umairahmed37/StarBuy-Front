import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearError } from '../Actions/UserActions'
import { LoginAction } from '../Actions/UserActions'
import MetaData from '../Layouts/MetaData'


const Login = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(state => state.UserLoginReducer)

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearError())
    }

    if (isAuthenticated) {
      navigate('/')
      alert.success("Logged in Successfully")
    }

  }, [isAuthenticated, error])

  // useEffect(() => {
  //   if (LogginError) {
  //     alert.error("Invalid Login Credentials")
  //   }
  // }, [LogginError])




  const handlesubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert.error("Please Fill All Fields")
    }
    dispatch(LoginAction(email, password))
    // navigate('/')
    // alert.success('Logged In Successfully')
    // setemail('')
    // setpassword('')
  }

  return (
    <div>

      <div className="container container-fluid">
        <MetaData title={"Login"} />
        <div className="row wrapper">
          {/* {
            loading ? <Spinner/> : ( */}
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handlesubmit}>
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  autoComplete='none'
                  type="email"
                  name="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  autoComplete='none'
                  type="password"
                  name="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              <Link to='/Forgot/Password' className="float-right mb-4">Forgot Password?</Link>

              <button
                id="login_button"
                type="submit"
                disabled={loading && 1}
                className="btn btn-block py-3"
              >
                {
                  loading ? "Loading" : "Login"
                }

              </button>

              <Link to='/register' className="float-right mt-3">New User?</Link>
            </form>
          </div>
          {/* )
          } */}
        </div>
      </div>
    </div>
  )
}

export default Login