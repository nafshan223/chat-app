import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id} = useParams()
    const toastOptions = {
      position: "bottom-right",
      autoClose: "8000",
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
          toast.error("pass shoulde be more than 8  characters", toastOptions);
          return false;
        } 
    
        axios.post(`http://localhost:4000/updatePassword/${id}`, { password })
            .then(res => {
                if (res.data.status) {
                    navigate('/login');
                } else {
                    console.log('Password update failed:', res.data.message);
                }
            })
            .catch(err => {
                console.log('An error occurred:', err);
                
            });
    };

    return(<>
      <FormContainer>
        <div >
      <div>
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="email">
              <h1 style={{color:"white",marginBottom:"40px"}}>New Password</h1>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
        
      </div>
    </div>
    </FormContainer>
          <ToastContainer />
          </>

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



export default ResetPassword;