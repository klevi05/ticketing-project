import { useEffect, useState } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router'
function Navbar(){
    const navigate = useNavigate();
    const [loged, setLoged] = useState(false);
    useEffect(()=>{//this ocours before the element is loaded to check for the jwt token
        const token = localStorage.getItem('token');
        if(token===null){
            setLoged(false)
        }else{
            fetch(//fetch in the backend and retrievethe information about the token
                import.meta.env.VITE_VERIFY, 
                {mode: 'cors', 
                method:"GET", 
                headers:
                {
                    'Content-Type':'application/json', 
                    'x-access-token': token
                }}).then((res)=>{
                    if(res.status === 200){
                        setLoged(true)
                    }else{//if there is any problem with the token given it will delete it
                        localStorage.removeItem('token')
                    }
                })
        }
    },[navigate])
    //Function handler for the logout
    function handleLogOut(){
        if(window.location.pathname!='/'){//if the route is diferent than '/' rediret to '/' and delete the token
            localStorage.removeItem('token')
            navigate('/', {replace:true})
        }else{//if the route is '/' delete the token and refresh the page
            localStorage.removeItem('token')
            window.location.reload()
        }
    }
    return(
        <>
        <div className='navbar'>
            <div className='logo'>
                <h4 className='logoText' onClick={()=>{navigate('/',{replace:true})}}>Ticketing System</h4>
            </div>
            {loged ?
                <>
                <div className='actions'>
                <button onClick={handleLogOut} className='signUpNavigation'>Log Out</button>
                 </div>
                </>:
                <div className='actions'>
                <button onClick={()=>{navigate('/signin', {replace:true})}} className='signInNavigation'>Log In</button>
                <button onClick={()=>{navigate('/signup', {replace:true})}} className='signUpNavigation'>Register</button>
            </div>
            }
        </div>
        </>
    )
}
export default Navbar