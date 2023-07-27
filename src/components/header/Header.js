import React from 'react'
import './Header.css'
import logo from '../../images/accoled.png'

function Header() {
  return (
    <section className="header">
        <div className='logo'>
            <a href='/'>
              <img src={logo} />
            </a>
        </div>
        <div className='signup-right'>
            Login
        </div>
    </section>
  )
}

export default Header
