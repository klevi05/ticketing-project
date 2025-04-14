import Navbar from "../navbar/navbar"
import './ticket.css';
import { useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import EditModal from './modal/editModal';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router";
import ImportTickets from "../import/import";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function Ticket(){
  const navigate = useNavigate();
  type TicketType = {
          _id: string;
          team: string;
          description: string;
          status: string;
          subject: string;
      };
      type AlertSeverity = "error" | "warning" | "info" | "success";
      const [edit, setEdit] = useState(false);
      const [reload, setReload] = useState(false);
      const [ticketData, setTicketData]= useState<TicketType | null>(null);
      const [data, setData] = useState([])
      const [ openModal, setOpenModal] = useState(false)
      const [loading, setLoading] = useState(true)
      const [alert, setAlert] = useState<[AlertSeverity, string] | []>([]);
      const handleOpen = () => setOpenModal(true);
      const handleClose = () => setOpenModal(false);
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
                              return res.json()
                          }else{//if there is any problem with the token given it will delete it
                              localStorage.removeItem('token')
                          }
                      }).then((res)=>{
                          getTickets(res['team'])
                      })
              }
          },[navigate, reload]);
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
                          handleAlerts('warning','Iternal server error code 500')
                      }
                  })
      }
      function handleAlerts(severity: AlertSeverity, message:string){
          setAlert([severity, message])
          setTimeout(() => {
              setAlert([]);
          }, 3000);
      }
  return(
    <>
    <div>
        <Navbar/>
    </div>
    {alert.length === 0 ? <></> : <Alert severity={alert[0]}>{alert[1]}</Alert>}
    <div className='home'>
        {loading? 
        <div className='homeCircle'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color='inherit'  size='10rem'/>
            </Box>
        </div>
         : 
        <>
          <div style={{width: '100%', display:'flex', justifyContent:'center'}}>
            <div className="importTask">
              <ImportTickets/>
            </div>
          </div>
            {data.length === 0 ? <Alert severity='success'>Your team has finished all their tasks!</Alert> :
            <><div className='ticketsList'>
                {[...data].reverse().map((tickets) => (
                  <div key={tickets['_id']} className='ticketBox'>
                    <div className='mainLineTickets'>
                      <h1 className='team'>{tickets['team']}</h1>
                      <button onClick={() => { setEdit(true); setTicketData(tickets); } } className='threeDots'><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></button>
                    </div>
                    <h4 className='subject'>Subject: {tickets['subject']}</h4>
                    <h4>Status: {tickets['status']}</h4>
                    <h4>{tickets['updatedDateFormatted']} {tickets['updatedAtFormatted']}</h4>
                    <div className='ticketActions'>
                      {tickets['status'] === 'New' ?
                        <>
                          <button onClick={() => { handleButtonActions(tickets['_id'], 'Open'); } } className='openTask'><h6>Open</h6></button>
                          <button onClick={() => { handleButtonActions(tickets['_id'], 'Close'); } } className='closeTask'> <h6>Close</h6></button>
                        </>
                        :
                        <> {tickets['status'] === 'Close' ?
                          <>
                            <button onClick={() => { handleOpen(); } } className='closeTask'><h6>Delete</h6></button>
                            {openModal ?
                              <>
                                <Modal
                                  open={openModal}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                      Are you sure you want to delete this ticket?
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                                      <Button onClick={() => { handleButtonActions(tickets['_id'], 'Delete'); handleAlerts('success', 'Ticket successfully deleted'); handleClose(); } } variant='contained' color='error'> Delete </Button>
                                      <Button onClick={handleClose} variant='contained' sx={{ color: 'black', backgroundColor: 'lightGray' }}> Cancel</Button>
                                    </Box>
                                  </Box>
                                </Modal>
                              </> : <></>}
                          </>
                          :
                          <button onClick={() => { handleButtonActions(tickets['_id'], 'Close'); } } className='closeTask'><h6>Close</h6></button>}
                        </>}
                      {edit && ticketData && (
                        <EditModal open={edit} setOpen={setEdit} ticket={ticketData} />
                      )}
                    </div>
                  </div>
                )
                )}
              </div><br /></>
        }
        </>
        } 
    </div>
    </>
)
}
export default Ticket