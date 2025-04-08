import { useEffect, useState } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router'
function Navbar(){
    const navigate = useNavigate();
    const [loged, setLoged] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(()=>{//this ocours before the element is loaded to check for the jwt token
        const token = localStorage.getItem('token');
        if(token===null){
            return;
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
    function openMenu(){
        setIsSidebarOpen(true);
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    }
    function closeMenu(){
        setIsSidebarOpen(false)
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }
    return(
        <>
        <nav className='navbar'>
            {/* This navbar is used when the view is changed for tablet and for phones */}
            <ul className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <li onClick={closeMenu} className='x-logo'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </li>
                <li><h4 className='logoText' onClick={()=>{navigate('/',{replace:true})}}>Ticketing System</h4></li>
            {
                loged? 
                <>
                    {/* This navbar is when the user is logged in*/}
                    <li>
                        <button onClick={()=>{navigate('/', {replace:true})}} className='signInNavigation'>Home</button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('/addNew', {replace:true})}} className='signInNavigation'>Add Ticket</button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('/tickets', {replace:true})}} className='signInNavigation'>Your tickets</button>
                    </li>
                    <li>
                        <button onClick={handleLogOut} className='signUpNavigation'>Log Out</button>
                    </li>
                </>
                : 
                <>
                    {/* This navbar is user is anonymus*/}
                    <li>
                        <button onClick={()=>{navigate('/', {replace:true})}} className='signInNavigation'>Home</button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('/signin', {replace:true})}} className='signInNavigation'>Log In</button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('/signup', {replace:true})}} className='signUpNavigation'>Register</button>
                    </li>
                </>
            }
            </ul>
            {/* This navbar is used when the view is for a laptop or biger */}
            <ul>
                <li><h4 className='logoText' onClick={()=>{navigate('/',{replace:true})}}>Ticketing System</h4></li>
            {
                loged?
                <>
                    {/* This when the user is logged in*/}
                    <li className='hiddenElemnet'>
                        <button onClick={()=>{navigate('/addNew', {replace:true})}} className='signInNavigation'>Add New</button>
                    </li>
                    <li className='hiddenElemnet'>
                        <button onClick={()=>{navigate('/tickets', {replace:true})}} className='signInNavigation'>Your Tickets</button>
                    </li>
                    <li className='hiddenElemnet'>
                        <button onClick={handleLogOut} className='signUpNavigation'>Log Out</button>
                    </li>
                </>
                :
                <>
                {/* This when the user is annonymus*/}
                <li className='hiddenElemnet'>
                    <button onClick={()=>{navigate('/signin', {replace:true})}} className='signInNavigation'>Log In</button>
                </li>
                <li className='hiddenElemnet'>
                    <button onClick={()=>{navigate('/signup', {replace:true})}} className='signUpNavigation'>Register</button>
                </li>
                </>
            }
                <li className='burger-icon' onClick={openMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </li>
            </ul>
        </nav>
        </>
    )
}
export default Navbar