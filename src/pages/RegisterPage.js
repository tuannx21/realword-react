import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { displayErrors } from '../helpers/utils'
import { REGISTER_START, CLEAR_ALL_AUTH_ERRORS } from '../store/constant'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  errors: state.auth.errorsRegister
})

const mapDispatchToProps = dispatch => ({
  register: user => dispatch({ type: REGISTER_START, user }),
  clearErrors: () => dispatch({ type: CLEAR_ALL_AUTH_ERRORS })
})

const RegisterPage = props => {
  const { errors, clearErrors, register } = props
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: ''
  })

  const onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    setUser({ ...user, [targetName]: targetValue })
  }

  // componentDidMount() {
  //   this.props.clearErrors()
  // }

  const onHandleSubmit = event => {
    event.preventDefault()
    setUser({
      email: '',
      username: '',
      password: ''
    })
    register(user)
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ul className="error-messages">
              {displayErrors(errors)}
            </ul>

            <form>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  name="username"
                  type="text"
                  value={user.username}
                  placeholder="Your Name"
                  onChange={onInputChange} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  name="email"
                  type="email"
                  user={user.email}
                  placeholder="Email"
                  onChange={onInputChange} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg"
                  name="password"
                  type="password"
                  user="user.password"
                  placeholder="Password"
                  onChange={onInputChange} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" onClick={onHandleSubmit}>Sign up</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)