import TextField from "@mui/material/TextField";
import Navbar from "../navbar/navbar";
import "./signin.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import validator from "validator";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    if (email && password != "") {
      if(validator.isStrongPassword(password,{minLength:8, minSymbols:1, minUppercase: 1, minNumbers:1})){
          if(validator.isEmail(email)){
            navigate('/', {replace: true})
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
          {alert === "" ? <></> : <Alert className="signinWarning" severity="warning">{alert}</Alert>}
            <h4>Sign In</h4>
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
