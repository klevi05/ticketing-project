import Navbar from "../navbar/navbar";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { Alert, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './addNew.css';
function AddNew(){
    const navigate = useNavigate();
    const [alert, setAlert] = useState('');
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("")
    const [team, setTeam] = useState("");
    const [loged, setLoged] = useState(false);
    useEffect(()=>{//this ocours before the element is loaded to check for the jwt token
        const token = localStorage.getItem('token');
        if(token===null){
            navigate('/*', {replace:true})
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
                        navigate('/*')
                    }
                })
        }
    },[navigate])
    const handleChangeTeam = (event: SelectChangeEvent) => {
        setAlert('');
        setTeam(event.target.value);
      };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setAlert('');
        setStatus(event.target.value);
    };
    function handleAddNew(e){
        e.preventDefault();
        if(subject && team && status != ""){
            console.log(subject , team, status)
        }else{
            setAlert('One of fields is empty')
        }
    }
    return(
        <>
            <Navbar/>
            {
                loged? 
                <>
                 <div className="addNewPage">
                    <div className="addNewBox">
                        {alert === ""? <></>: <Alert severity="warning">{alert}</Alert>}
                        <h4>Add New Ticket</h4>
                        <TextField 
                        id="subject"
                        label="Subject"
                        variant="standard"
                        type="text"
                        onChange={(e)=>{
                            setSubject(e.target.value);
                            setAlert('');
                        }}
                        required
                        />
                        <TextField 
                        id="description"
                        label="description"
                        variant="standard"
                        type="text"
                        onChange={(e)=>{
                            setSubject(e.target.value)
                            setAlert('');
                        }}
                        />
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Team</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={team}
                                label="Team"
                                onChange={handleChangeTeam}
                            >
                                <MenuItem value={'Development'}>Development</MenuItem>
                                <MenuItem value={'Support'}>Support</MenuItem>
                                <MenuItem value={'Sales'}>Sales</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Team"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={'New'}>New</MenuItem>
                                <MenuItem value={'Open'}>Open</MenuItem>
                                <MenuItem value={'Closed'}>Closed</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                        <button
                            onClick={(e) => {
                                handleAddNew(e);
                            }}
                            className="signupButton"
                            >
                            Submit
                            </button>
                    </div>
                 </div>
                </> 
                : <> </>
            }
        </>
    )
}
export default AddNew;