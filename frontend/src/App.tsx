import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import NotFound from "./components/404/notFound";
import AddNew from "./components/addNewTicket/addNew";
import Ticket from './components/tickets/tickets'
import './app.css';
//all the routes of the project will go under this file
//follow the same structure
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/addNew" element={<AddNew/>}/>
        <Route path='/tickets' element={<Ticket/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
