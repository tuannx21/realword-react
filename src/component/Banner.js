import React from 'react'

function Banner(props) {
  const { title, children } = props

  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default Banner