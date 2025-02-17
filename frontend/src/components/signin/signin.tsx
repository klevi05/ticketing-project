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
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      /*✅ 8 characters (minimum)
        ✅ One uppercase letter
        ✅ One lowercase letter
        ✅ One number
        ✅ One special character */
      const isValidPassword = (password: string) =>
        passwordRegex.test(password);
      if (validator.isEmail(email) && isValidPassword(password)) {
        console.log("sent for email and password");
        navigate("/", { replace: true });
      } else if (!validator.isEmail(email)) {
        setAlert("Incompatible email");
      } else if (!isValidPassword(password)) {
        setAlert("Incompatible password");
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
            <h4>Sign In</h4>
            {alert === "" ? <></> : <Alert severity="warning">{alert}</Alert>}
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
