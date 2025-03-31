import TextField from "@mui/material/TextField";
import Navbar from "../navbar/navbar";
import "./signin.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import {useNavigate } from "react-router";
import validator from "validator";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    if (email && password != "") {
      if(validator.isStrongPassword(password,{minLength:5, minSymbols:1, minUppercase: 1, minNumbers:1})){
          if(validator.isEmail(email)){
            fetch(
              import.meta.env.VITE_URL_SIGNIN,
              {mode: 'cors', method: 'POST', 
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                  'email': email,
                  'password': password
                })
              }
            ).then((res)=>{
              if(res.status === 200){
                return res.json();
              }else if(res.status === 204){
                setAlert('The email does not exist!')
              }else if(res.status === 202){
                setAlert('The password is not correct!')
              }
            }).then((res)=>{
               localStorage.setItem('token', res['token'])
               navigate('/',{replace:true})
            })
          }else{
          setAlert("Please write a valid email!")
          }
      }else{
        setAlert("The password is not in format!")
      }
    } else {
      setAlert("One of the fields is empty!");
    }
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="signinPage">
          <div className="signinForm">
          {alert === "" ? <></> : <Alert  severity="warning">{alert}</Alert>}
            <h4 className="siginLabel">Sign In</h4>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
                setAlert("");
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => {
                setPassword(e.target.value);
                setAlert("");
              }}
            />
            <button
              onClick={(e) => {
                handleSignIn(e);
              }}
              className="signinButton"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signin;
