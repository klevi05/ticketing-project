import TextField from "@mui/material/TextField";
import Navbar from "../navbar/navbar";
import "./signup.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import hashing from "../hashing/hashing";
import validator from "validator";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [alert, setAlert] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
    if (email && password && name && team != "") {//check all the areas are not empty
      //validate the password based on the requirements
        if(validator.isStrongPassword(password,{minLength:5, minSymbols:1, minUppercase: 1, minNumbers:1})){
          //validate if the email is really an email
           if(validator.isEmail(email)){
            //fetch in the backend to save the user
            try {
              fetch(
                import.meta.env.VITE_URL_SIGNUP, 
                {mode: 'cors', method: 'POST', 
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                  'name': name,
                  'email': email,
                  'password': hashing(password),
                  'team': team
                })
              }).then((res)=>{
                //check everythin and if any error set the proper alert message
                 if(res.status === 200){
                   navigate('/', {replace:true})
                 }else if(res.status === 204){
                  setAlert('Email already used!')
                 }else{
                  setAlert('Something went wrong!')
                 }
              })
              
            } catch (error) {
              console.log(error)
            }
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
  const handleChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value);
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="signupPage">
          <div className="signupForm">
          {alert === "" ? <></> : <Alert className="warnings" severity="warning">{alert}</Alert>}
            <h4>Sign Up</h4>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                setAlert("");
              }}
            />
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
            <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Team</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={team}
                label="Team"
                onChange={handleChange}
              >
                <MenuItem value={'Development'}>Development</MenuItem>
                <MenuItem value={'Support'}>Support</MenuItem>
                <MenuItem value={'Sales'}>Sales</MenuItem>
              </Select>
            </FormControl>
          </Box>
            <button
              onClick={(e) => {
                handleSignUp(e);
              }}
              className="signupButton"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
