import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/signup/Signup.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
