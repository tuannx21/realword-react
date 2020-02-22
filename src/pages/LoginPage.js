import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGIN_START, CLEAR_ALL_AUTH_ERRORS } from '../store/constant'
import { displayErrors } from '../helpers/utils'

const LoginPage = props => {
  const [user, setUser] = useState({ email: '', password: '' })
  const errors = useSelector(state => state.auth.errorsLogin)
  const dispatch = useDispatch()

  const login = user => dispatch({ type: LOGIN_START, user })
  const clearErrors = useCallback(() => dispatch({ type: CLEAR_ALL_AUTH_ERRORS }), [dispatch])

  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  const onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    setUser({ ...user, [targetName]: targetValue })
  }

  const onHandleSubmit = event => {
    event.preventDefault()
    login(user)
    setUser({ email: '', password: '' })
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="/signup">Haven't got an account?</Link>
            </p>

            <ul className="error-messages">
              {displayErrors(errors)}
            </ul>

            <form>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  type="text"
                  name="email"
                  value={user.email}
                  placeholder="Email"
                  onChange={onInputChange} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  onChange={onInputChange} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit" onClick={onHandleSubmit}>Log In</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage