import TextField from "@mui/material/TextField";
import Navbar from "../navbar/navbar";
import "./signup.css";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [alert, setAlert] = useState("");
  function handleSignUp(e) {
    e.preventDefault();
    if (name && email && password && team != "") {
      console.log("sent");
      navigate("/", { replace: true });
    } else {
      setAlert("One of the fields is empty!");
    }
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="signupPage">
          <div className="signupForm">
            <h4>Sign Up</h4>
            {alert === "" ? <></> : <Alert severity="warning">{alert}</Alert>}
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
            <TextField
              id="password"
              label="Team"
              variant="standard"
              type="text"
              onChange={(e) => {
                setTeam(e.target.value);
                setAlert("");
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
