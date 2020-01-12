import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGIN_START } from '../store/constant'

const mapStateToProps = state => ({
  errors: state.auth.errors
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch({ type: LOGIN_START, user })
})

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
  }

  onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    this.setState({
      user: {
        ...this.state.user,
        [targetName]: targetValue
      }
    })
  }

  onHandleSubmit = event => {
    event.preventDefault()
    this.setState({
      user: {
        email: '',
        password: ''
      }
    })
    this.props.login(this.state.user)
  }

  displayErrors = errors => {
    return Object.keys(errors).map(errorKey => {
      return errors[errorKey].map(line => (<li key={errorKey}>{`${errorKey} ${line}`}</li>))
    })
  }

  render() {
    const { user } = this.state
    const { errors } = this.props

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
                {this.displayErrors(errors)}
              </ul>

              <form>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    type="text"
                    name="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={this.onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={this.onInputChange} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" onClick={this.onHandleSubmit}>Log In</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)