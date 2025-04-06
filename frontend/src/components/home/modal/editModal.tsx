import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Alert from "@mui/material/Alert";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '20px',
    bgcolor: 'background.paper',
    p: 4
  };
type TicketType = {
    team: string;
    subject: string;
    description: string;
    status: string;
    _id: string; 
};
type EditModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ticket : TicketType | null;
};
function EditModal({open, setOpen, ticket}: EditModalProps ){
    const [team, setTeam] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [subject, setSubject] = useState('')
    const [alert, setAlert] = useState('')
    useEffect(()=>{
        if (ticket){
            setTeam(ticket?.team)
            setDescription(ticket?.description)
            setStatus(ticket?.status)
            setSubject(ticket?.subject)
        }
    },[ticket])
    //function to edit and update the ticket
    function handleUpdate(){
        if(team != ticket?.team || description != ticket?.description || status != ticket?.status || subject != ticket?.subject ){
            try {
                fetch(
                    import.meta.env.VITE_UPDATETICKETS, 
                    {mode: 'cors', method: 'POST', 
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({
                      '_id': ticket?._id,
                      'subject': subject,
                      'description': description,
                      'team': team,
                      'status': status
                    })
                  }).then((res)=>{
                    //check everythin and if any error set the proper alert message
                     if(res.status === 200){
                       setAlert('The data succesfully updatet!');
                       window.location.reload();
                     }else if(res.status === 404){
                      setAlert('The ticket is not found')
                     }else if(res.status === 500){
                      setAlert('Internal server Error 500!')
                     }
                  })
            } catch (error) {
                console.log(error)
            }
        }else{
            setAlert('The data has not changed!')
        }
    }
    const handleClose = () => {
        setOpen(false);
      };
    const handleChangeStatus = (event: SelectChangeEvent) => {
            setStatus(event.target.value);
        };
    return(
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.35)' } }}
        >
            <Box sx={{ ...style, width: 400, display:'flex', flexDirection:'column' }}>
                {alert === "" ? <></> : <Alert severity="warning">{alert}</Alert>}
                <Typography id="spring-modal-title" variant="h6" component="h2">
                Edit Ticket
                </Typography>
                <TextField
                id='team'
                sx={{mt:3}}
                value={team}
                variant='standard'
                label='Team'
                type='text'
                disabled
                onChange={(e)=>{
                    setTeam(e.target.value);
                    setAlert('')
                }}
                />
                <TextField
                id='subject'
                sx={{mt:3}}
                value={subject}
                variant='standard'
                label='Subject'
                type='text'
                onChange={(e)=>{
                    setSubject(e.target.value);
                    setAlert('')
                }}
                />
                <TextField
                id='description'
                sx={{mt:3}}
                value={description}
                variant='standard'
                label='Description'
                type='text'
                onChange={(e)=>{
                    setDescription(e.target.value);
                    setAlert('')
                }}
                />
                <Box sx={{ minWidth: 200, mt:3 }}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={'New'} disabled>New</MenuItem>
                                <MenuItem value={'Open'}>Open</MenuItem>
                                <MenuItem value={'Close'}>Close</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                <Button onClick={handleUpdate} sx={{backgroundColor:'black', color:'white', mt:4}} >Submit Changes</Button>
            </Box>
        </Modal>
        </div>
    )
}

export default EditModal;