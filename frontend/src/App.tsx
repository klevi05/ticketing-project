import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
//all the routes of the project will go under this file
//follow the same structure
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
