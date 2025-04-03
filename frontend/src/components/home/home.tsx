import './home.css';
import Navbar from '../navbar/navbar';
import { useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Home(){
    const [data, setData] = useState([])
    const [loged, setLoged] = useState(false)
    const [loading, setLoading] = useState(true)
    function getTickets( team: string){
        fetch(//fetch in the backend and retrievethe information about the token
            import.meta.env.VITE_GETTICKETS, 
            {mode: 'cors', 
            method:"GET", 
            headers:
            {
                'Content-Type':'application/json', 
                'x-access-team': team
            }}).then((res)=>{
                if(res.status === 200){
                    return res.json()
                }else{
                    console.log('sometheing went wrong')
                }
            }).then((res)=>{
                setData(res)
                setLoading(false)
            })
    }
    useEffect(()=>{//this ocours before the element is loaded to check for the jwt token
            const token = localStorage.getItem('token');
            if(token===null){
                setLoading(false)
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
                            return res.json()
                        }else{//if there is any problem with the token given it will delete it
                            localStorage.removeItem('token')
                        }
                    }).then((res)=>{
                        setLoged(true)
                        getTickets(res['team'])
                    })
            }
        },[])
    return(
        <>
        <div>
            <Navbar/>
        </div>
        <div className='home'>
            {loading? 
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color='inherit'  size='10rem'/>
            </Box> : 
            <>
            {
                !loged ?
                <div className='welcomingBox'>
                    <h1 className='welcomingText'>Welcome to STS</h1>
                </div>
                :
                <>
                <div className='ticketsList'>
                    {
                    data.map((tickets) => (
                        <div key={tickets['_id']} className='ticketBox'>
                            <div className='mainLineTickets'>
                            <h1 className='team'>Team: {tickets['team']}</h1>
                            <button onClick={()=>{console.log(tickets['_id'])}} className='threeDots'><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg></button>
                            </div>
                            <h4>Description: {tickets['description']}</h4>
                            <h4>Status: {tickets['status']}</h4>
                            <h4>{tickets['updatedAtFormatted']} {tickets['updatedDateFormatted']}</h4>
                            <div className='ticketActions'>
                            {tickets['status'] === 'New'? 
                            <>
                            <button className='openTask'><h6>Open</h6></button>
                            <button className='closeTask'> <h6>Close</h6></button>
                            </>
                            :
                            <> {
                                tickets['status'] === 'Closed'?
                                <button className='closeTask'><h6>Delete</h6></button>:
                                <button className='closeTask'><h6>Close</h6></button>
                            }
                            </>
                            }
                            </div>
                        </div>
                    )
                    )
                    }
                </div>
                <br />
                </>
            }
            </>
            } 
        </div>
        </>
    )
}

export default Home