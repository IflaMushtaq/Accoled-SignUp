import React, { useState } from 'react';
import { useMemo } from 'react';
import { pulse } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import countryList from 'react-select-country-list';
import Input from '../atoms/input/input'
import Select from '../atoms/select/select';
import './Form.css';

function Form() {
  const styles = {
    pulse: {
      animation: 'x 1.5s',
      animationName: Radium.keyframes(pulse, 'pulse'), 
    }
  };

  const maxPhoneNumberLength = 10;
  const options = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    email:"",
    password:"",
    confirmPassword:"",
    phone:"",
    phoneError:"",
    country:"",
    checkboxState:false,
  })

  const handleChange = (event) => {
    console.log("Form Control Change: ", event)
    const selector = event.target.name;
    switch (selector) {

      case "phone":
      if (event.target.value.length === maxPhoneNumberLength) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
          phoneError: "",
        });
      } else {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
          phoneError: "Phone number should be exactly 10 digits.",
        });
      }
      break;

      case "confirmPassword":
        const isPasswordMatched = formData.password === event.target.value;
        setFormData({
          ...formData,
          [event.target.name]:event.target.value,
          isPasswordMatched:isPasswordMatched
        });
        break;
      
      case "checkbox":
        setFormData({
          ...formData,
          checkboxState: event.target.checked,
        });
        break;
    
      default:
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.phone.length !== maxPhoneNumberLength) {
      return;
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      phoneError: "",
      country: "",
      checkboxState: false,
    });
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
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <Input 
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}  
            />
          </div>
          <div className="field">
            <Input 
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}  
            />
          </div>
          <div className="field">
            <Input 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}  
            />
            {formData.confirmPassword && !formData.isPasswordMatched && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                * Passwords do not match
              </span>
            )}
          </div>
          <div className="field">
            <Input 
              type="number"
              id="phone"
              name="phone"
              placeholder="Phone no."
              value={formData.phone}
              onChange={handleChange}  
            />
            {formData.phoneError && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>{formData.phoneError}</span>
            )}
          </div>
          <div className="field">
            <Select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={options}
            />
          </div>
          <div className='field field-checkbox'>
            <div>
            <Input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              className="checkbox"
              checked={formData.checkboxState}
              onChange={handleChange}
            />
            </div>
            <div style={{fontSize:"0.8rem"}}>
              I agree to the <a className="terms" href='/'>Terms & Conditions </a>and <a className="terms" href="/">Privacy Policy</a>
            </div>
          </div> 
          <br />
          <div className="field">
            <Input
              type="submit"
              value="Submit"
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </StyleRoot>
  );
}

export default Form;