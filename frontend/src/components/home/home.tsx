import './home.css';
import Navbar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
function Home(){ 
    const [loged, setLoged]  = useState(false)
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
                        console.log('hello')
                    }else{//if there is any problem with the token given it will delete it
                        localStorage.removeItem('token')
                    }
                })
        }
    },[]);
    return(
        <>
        <div>
            <Navbar/>
        </div>
        <div className='home'>
            <div className='welcomingBox'>
                <h1 className='welcomingText'>Welcome to STS</h1>
                {!loged ? 
                    <div className='notLoggedButton'>
                        <Button>Hello</Button>
                    </div>
                :
                    <div className='loggedButtons'>
                        <Button>Hello</Button>
                        <Button>Hello</Button>
                    </div>
                }
            </div>
        </div>
        </>
    )
}

export default Home