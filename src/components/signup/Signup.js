import React from 'react'
import './Signup.css'
import Header from '../header/Header.js'
import Form from '../form/Form.js'
import Footer from '../footer/Footer.js'
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  return (
    <div className='signup'>
      <Header/>
      <Form/>
      <Footer/>
    </div>
  )
}

export default Signup
