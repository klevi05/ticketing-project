import './navbar.css'
import { useNavigate } from 'react-router'
function Navbar(){
    const navigate = useNavigate();
    return(
        <>
        <div className='navbar'>
            <div className='logo'>
                <h4 className='logoText' onClick={()=>{navigate('/',{replace:true})}}>Ticketing System</h4>
            </div>
            <div className='actions'>
                <button onClick={()=>{navigate('/signin', {replace:true})}} className='signInNavigation'>Sign In</button>
                <button onClick={()=>{navigate('/signup', {replace:true})}} className='signUpNavigation'>Sign Up</button>
            </div>
        </div>
        </>
    )
}
export default Navbar