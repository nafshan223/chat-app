import React, {  useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { verifyOtpRoute } from "../utils/APIRoutes";
 function Otpverification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(verifyOtpRoute, { otp });
      setMessage(response.data.message);
      setError('');
      navigate('/setAvatar')
    } catch (err) {
      setError(err.response.data.message || 'Something went wrong');
      setMessage('');
    }
  };
  return (
   
        <FormContainer>
        <div >
      <div>
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="email">
              <h1 style={{color:"white",marginBottom:"40px"}}>OTP VERIFICATION</h1>
            </label>
            <input 
            type="password"
            placeholder="Enter otp" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Verify Otp
          </button>
          </form>
          {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
    </FormContainer>
    )
}
          
   

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      align-items: center;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


export default Otpverification