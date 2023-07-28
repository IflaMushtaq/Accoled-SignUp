import React, { useState } from 'react';
import { useMemo } from 'react';
import { pulse } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import countryList from 'react-select-country-list';
import './Form.css';

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
  const [phone, setPhone] = useState('');
  const maxPhoneNumberLength = 10;
  const [phoneError, setPhoneError] = useState('');
  const [country, setCountry] = useState(''); 
  const [checkboxState, setCheckboxState] = useState(false); 

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
      setPhoneError(inputPhone.length < maxPhoneNumberLength ? 'Phone number should be exactly 10 digits.' : '');
    } else {
      setPhoneError('Phone number should not exceed 10 digits.');
    }
  };

  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (selectedCountry) => {
    setCountry(selectedCountry);
  };
  
  const handleCheckboxChange = (event) => {
    setCheckboxState(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone.length !== maxPhoneNumberLength) {
      setPhoneError('Phone number should be exactly 10 digits.');
      return;
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setPhoneError('');
    setCountry('');
    setCheckboxState(false);
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
        <h2>Start your journey with us!</h2>
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
              autoComplete="off" 
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
            {phoneError && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{phoneError}</span>
            )}
          </div>
          <div className="field">
            <select
              id="country"
              name="country"
              value={country}
              onChange={(e) => changeHandler(e.target.value)}
              required
            >
              <option value="">
                Select Country
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className='field'>
            <input required type="checkbox" className='checkbox' checked={checkboxState} onChange={handleCheckboxChange}/>
            <span style={{fontSize:"0.8rem"}}>I agree to the <a className="terms" href='/'>Terms & Conditions </a>and <a className="terms" href="/">Privacy Policy</a></span>
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
