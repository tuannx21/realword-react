import React from 'react'

export const displayErrors = errors => {
  return Object.keys(errors).map(errorKey => {
    return errors[errorKey].map(line => (<li key={errorKey}>{`${errorKey} ${line}`}</li>))
  })
}