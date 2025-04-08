import { Button ,Box,Typography, Modal } from '@mui/material';
import './summary.css';
import { useState } from 'react';

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
  type SummaryProps = {
    sales: number;
    dev: number;
    support: number;
  };
function Summary({sales , dev, support}: SummaryProps){
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <>
        <Button onClick={handleOpen} variant='outlined' style={{borderColor: 'black', color:'black'}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
          Summary Report
          </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Summary Report
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb:2 }}>
              This is a numerical summary report of all the teams tickets that are not closed yet.
            </Typography>
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Support</th>
                <th scope="col">Development</th>
                <th scope="col">Sales</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{support}</td>
                <td>{dev}</td>
                <td>{sales}</td>
                </tr>
            </tbody>
            </table>
            <Button onClick={handleClose} variant='contained' sx={{backgroundColor:"black", mt:2}}>Close</Button>
          </Box>
        </Modal>
        </>
    )
}
export default Summary;