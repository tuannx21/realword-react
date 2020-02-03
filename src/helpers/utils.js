import React from 'react'

export const displayErrors = errors => {
  return Object.keys(errors).map(errorKey => {
    // return errors[errorKey].map(line => (<li key={errorKey}>{`${errorKey} ${line}`}</li>))
    return (
      <li key={errorKey}>{errorKey} {errors[errorKey].map(line => `${line}, `)}</li>
    )
  })
}

export const formatDate = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}