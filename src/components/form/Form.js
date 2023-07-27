import React, { useState } from 'react';
import { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './Form.css';
import { pulse } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function Form() {
    const styles = {
        pulse: {
            animation: 'x 1.5s',
            animationName: Radium.keyframes(pulse, 'pulse'), 
        }
    };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry]=useState('')
  const [phone, setPhone] = useState('');
  const maxPhoneNumberLength = 10;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isPasswordMatched = password === confirmPassword;  

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value;
    if (inputPhone.length <= maxPhoneNumberLength) {
      setPhone(inputPhone);
    }
  };

  const options=useMemo(()=>countryList().getData(),[])
  const changeHandler = country =>{
    setCountry(country)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone.length !== maxPhoneNumberLength) {
      alert('Phone number should be exactly 10 digits.');
      return;
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCountry('');
    setPhone('');
    showToastMessage();
  };

  const showToastMessage = () => {
    toast.success('Account Created Successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      className: 'custom-toast',
    });
  }; 

  return (
    <StyleRoot>
        <div className='form-container' style={styles.pulse}>
        <h2 style={{ color: '#0D5CA6', textAlign: 'center' }}>Start your journey with us!</h2>
        <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
              />
            </div>
            <div className="field">
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            </div>
            <div className="field">
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                pattern={password}
            />
            {!isPasswordMatched && <span style={{ color: 'red', fontSize:"0.8rem" }}>* Passwords do not match</span>}
            </div>
            <div className="field">
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Phone no."
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {phone.length > maxPhoneNumberLength && (
                <span style={{ color: 'red', fontSize: '0.8rem' }}>* Phone number should not exceed 10 digits</span>
              )}
            </div>
            <div className="field">
            <Select required options={options} value={country} onChange={changeHandler}/>
            </div>
            <div className='field'>
              <input required type="checkbox" />
              <span style={{fontSize:"0.9rem", textAlign:"center"}}>I agree to the <a className="terms" href='/'>Terms & Conditions </a>and <a className="terms" href="/">Privacy Policy</a></span>
            </div>
            <br />
            <div className="field">
              <input type="submit" value="Submit" />
            </div>
        </form>
        <ToastContainer />
        </div>
    </StyleRoot>
  );
}

export default Form;
