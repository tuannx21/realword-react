import React from 'react'

const ErrorList = ({ errors }) => {
  return (
    <ul className="error-messages">
      {Object.keys(errors).map(errorKey => {
        return (
          <li key={errorKey}>{errorKey} {errors[errorKey].map(line => `${line}, `)}</li>
        )
      })}
    </ul>
  )
}

export default ErrorList