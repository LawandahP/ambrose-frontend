import React from 'react'

const LoginButton = ({text, icon, onClick, disabled}) => {
  return (
    <button disabled={disabled} className='login-button' onClick={onClick}>
        <div style={{marginTop: '2px'}}>{icon}</div>
        <div>{text}</div>
    </button>
  )
}

export default LoginButton