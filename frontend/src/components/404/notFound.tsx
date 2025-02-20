import Navbar from "../navbar/navbar"
import { useNavigate } from "react-router";
import './notFound.css';
function NotFound(){
    const navigator = useNavigate();
    return(
        <>
        <Navbar/>
        <div className="notFoundPage">
            <h1 className="code">404.</h1>
            <h4>Wrong page buddy! Go back to home page.</h4>
            <button onClick={()=>{navigator('/', {replace: true})}} className="homepageButton">Back Home</button>
        </div>
        </>
    )
}
export default NotFound;