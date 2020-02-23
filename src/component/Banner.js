import React from 'react'

const Banner = ({ title, children }) => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">{title}</h1>
      {children}
    </div>
  </div>
)

export default Banner