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