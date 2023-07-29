import React from 'react'
import './Header.css'
import logo from '../../images/accoled.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <section className="header">
        <div className='logo'>
            <a href='/'>
              <img src={logo} />
            </a>
        </div>
        <div className='signup-right'>
          <FontAwesomeIcon icon={faBars} style={{ height: '1.3rem' }} />
        </div>
    </section>
  )
}

export default Header
