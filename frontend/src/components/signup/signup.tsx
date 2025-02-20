import TextField from "@mui/material/TextField";
import Navbar from "../navbar/navbar";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  function handleSignUp(e) {
    e.preventDefault();
    if (name && email && password && team != "") {
      console.log("sent");
      navigate("/", { replace: true });
    }
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="signupPage">
          <div className="signupForm">
            <h4>Sign Up</h4>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              id="password"
              label="Team"
              variant="standard"
              type="text"
              onChange={(e) => {
                setTeam(e.target.value);
              }}
            />
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
