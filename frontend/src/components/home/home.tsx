import './home.css';
import Navbar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import Summary from './summary/summary';
import ImportTickets from '../import/import';
function Home(){ 
    const [loged, setLoged]  = useState(false)
    const [support , setSupport] = useState(0);
    const [development , setDevelopment] = useState(0);
    const [sales, setSales]= useState(0);
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
    },[]);    
    useEffect(()=>{  
        fetch(
            import.meta.env.VITE_GETUNSOLVEDTICKETS, 
            {mode: 'cors', 
            method:"GET", 
            headers:
            {
                'Content-Type':'application/json', 
            }}).then((res)=>{
                if(res.status === 200){
                    return res.json()
                }else{
                    console.log('Error with the server')
                }
            }).then((res)=>{
                [...res].map((unsolved)=>{
                    switch(unsolved['team']){
                        case 'Support':
                            setSupport(unsolved['openTickets']);
                            break
                        case 'Development':
                            setDevelopment(unsolved['openTickets'])
                            break
                        case 'Sales':
                            setSales(unsolved['openTickets'])
                            break
                    }
                })
            })  
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
                        <Summary sales={sales} dev={development} support={support}/>
                    </div>
                :
                    <div className='loggedButtons'>
                        <Summary sales={sales} dev={development} support={support}/>
                        <ImportTickets/>
                    </div>
                }
            </div>
        </div>
        </>
    )
}

export default Home