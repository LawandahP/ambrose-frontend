/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const LoginButton = ({text, icon, onClick}) => {
  return (
    <div className='login-button' onClick={onClick}>
        <div style={{marginTop: '2px'}}>{icon}</div>
        <div>{text}</div>
    </div>
  )
}

export default LoginButton