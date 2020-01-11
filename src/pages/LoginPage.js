import React, { Component } from 'react'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
      }
    }
  }

  onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name
    console.log(this.state.user)
    this.setState({
      user: {
        ...this.state.user,
        [targetName]: targetValue
      }
    })
  }

  render() {
    const { user } = this.state
    console.log(this.state.user)
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              {/* <p className="text-xs-center">
                <a href="/">Have an account?</a>
              </p> */}

              <ul className="error-messages">
                <li>That email is already taken</li>
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
                <button className="btn btn-lg btn-primary pull-xs-right">Log In</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage