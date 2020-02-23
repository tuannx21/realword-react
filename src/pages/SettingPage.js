import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_PROFILE_START, CLEAR_ALL_AUTH_ERRORS } from '../store/constant'
import ErrorList from '../component/ErrorList'

const SettingPage = props => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const errors = useSelector(state => state.auth.errorsUpdateProfile)

  const dispatch = useDispatch()
  const updateProfile = user => dispatch({ type: UPDATE_PROFILE_START, user })
  const onPageUnload = useCallback(() => dispatch({ type: CLEAR_ALL_AUTH_ERRORS }), [dispatch])

  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    setUser(currentUser)
    return onPageUnload
  }, [currentUser, onPageUnload])

  const onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    setUser({ ...user, [targetName]: targetValue })
  }

  const onHandleSubmit = event => {
    event.preventDefault()
    updateProfile(user)
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ErrorList errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input className="form-control"
                    name="image"
                    type="text"
                    placeholder="URL of profile picture"
                    value={user.image || ''}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="username"
                    type="text"
                    placeholder="Your Name"
                    value={user.username || ''}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg"
                    name="bio"
                    rows="8"
                    placeholder="Short bio about you"
                    value={user.bio || ''}
                    onChange={onInputChange}></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={user.email || ''}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="password"
                    type="password"
                    placeholder="Your new password"
                    onChange={onInputChange} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" onClick={onHandleSubmit}>
                  Update Settings
                  </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage