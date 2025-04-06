import './home.css';
import Navbar from '../navbar/navbar';
import { useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import EditModal from './modal/editModal';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
function Home(){
    type TicketType = {
        _id: string;
        team: string;
        description: string;
        status: string;
        subject: string;
    };
    const [edit, setEdit] = useState(false);
    const [reload, setReload] = useState(false);
    const [ticketData, setTicketData]= useState<TicketType | null>(null);
    const [data, setData] = useState([])
    const [loged, setLoged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState('')
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
        },[reload]);
    function handleButtonActions(id: string, action: string){
        fetch(//fetch in the backend and retrievethe information about the token
            import.meta.env.VITE_UPDATESTATUS, 
            {
                mode: 'cors', 
                method:"GET", 
                headers:
                {
                    'Content-Type':'application/json', 
                    'tab-t-id': id,
                    'tab-t-action': action
                }}).then((res)=>{
                    if(res.status === 200){
                        setReload(prev => !prev);
                    }else{
                        setAlert('Iternal server error code 500')
                    }
                })
    }
    return(
        <>
        <div>
            <Navbar/>
        </div>
        {alert === "" ? <></> : <Alert severity="warning">{alert}</Alert>}
        <div className='home'>
            {loading? 
            <div className='homeCircle'>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress color='inherit'  size='10rem'/>
                </Box>
            </div>
             : 
            <>
            {
                !loged ?
                <div className='welcomingBox'>
                    <h1 className='welcomingText'>Welcome to STS</h1>
                </div>
                :
                <>
                {data.length === 0 ? <div className='welcomingBox'>
                    <h1 className='welcomingText'>Welcome to STS</h1>
                </div>:
                <div className='ticketsList'>
                    {
                    [...data].reverse().map((tickets) => (
                        <div key={tickets['_id']} className='ticketBox'>
                            <div className='mainLineTickets'>
                            <h1 className='team'>Team: {tickets['team']}</h1>
                            <button onClick={()=>{setEdit(true); setTicketData(tickets);}} className='threeDots'><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                            </div>
                            <h4>Subject: {tickets['subject']}</h4>
                            <h4>Status: {tickets['status']}</h4>
                            <h4>{tickets['updatedAtFormatted']} {tickets['updatedDateFormatted']}</h4>
                            <div className='ticketActions'>
                            {tickets['status'] === 'New'? 
                            <>
                            <button onClick={()=>{handleButtonActions(tickets['_id'], 'Open')}} className='openTask'><h6>Open</h6></button>
                            <button onClick={()=>{handleButtonActions(tickets['_id'], 'Close')}} className='closeTask'> <h6>Close</h6></button>
                            </>
                            :
                            <> {
                                tickets['status'] === 'Close'?
                                <button onClick={()=>{handleButtonActions(tickets['_id'], 'Delete')}} className='closeTask'><h6>Delete</h6></button>:
                                <button onClick={()=>{handleButtonActions(tickets['_id'], 'Close')}} className='closeTask'><h6>Close</h6></button>
                            }
                            </>
                            }
                            {edit && ticketData && (
                            <EditModal open={edit} setOpen={setEdit} ticket={ticketData} />
                            )}
                            </div>
                        </div>
                    )
                    )
                    }
                </div>
            }
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