import { Button, Box,Typography, Modal } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function ImportTickets() {
    const [alert, setAlert] = useState('')
    const [file, setFile]= useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [listTicket, setListTicket] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setListTicket(null); setAlert('')};
    interface Ticket {
        subject: string;
        description: string;
        team: 'Support' | 'Sales' | 'Development';
        status: 'New' | 'Open' | 'Closed';
      }    
      interface ParsedTickets {
        tickets: Ticket[];
      }  
    //this function is used to validate if the data given in the file is correct
    const validateTickets = (data: string | ArrayBuffer | null): ParsedTickets | null => {
        if (typeof data !== 'string') return null;
      
        try {
          const parsed = JSON.parse(data);
      
          if (!parsed.tickets || !Array.isArray(parsed.tickets)) return null;
      
          const isValid = parsed.tickets.every((ticket: Ticket) =>
            typeof ticket.subject === 'string' &&
            typeof ticket.description === 'string' &&
            ['Support', 'Sales', 'Development'].includes(ticket.team) &&
            ['New', 'Open', 'Closed'].includes(ticket.status)
          );
      
          return isValid ? parsed : null;
        } catch (err) {
          console.error("Invalid JSON:", err);
          return null;
        }
      }; 
    //this function is used to read the file and to put its content in a state
    const readFileOnUpload = (uploadedFile: File) =>{
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const result = fileReader.result;

            if (validateTickets(result)) {
                const parsed = JSON.parse(result as string);
                setListTicket(parsed.tickets); 
                setAlert('✅ Valid file. Ready to upload.')
            } else {
                setListTicket(null)
                setAlert('❌ Invalid file format or missing fields.')
            }
          };
        if( uploadedFile!== undefined)
           fileReader.readAsText(uploadedFile);
     }
    //This function is used to get the file
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0])
            const files = Array.from(fileList);
            readFileOnUpload(files[0]);
        }
      }
    const handleUpload = async () => {
    if (!file) {
        setAlert('No file selected.');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch( 
        import.meta.env.VITE_IMPORT,
            {
            mode:'cors',
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            setAlert(`✅ ${data.message}`);
            setListTicket(null); // Clear preview after success
            setFile(null);
        } else {
            const error = data.errors ? JSON.stringify(data.errors, null, 2) : data.error || 'Unknown error';
            setAlert(`❌ Import failed: ${error}`);
            setListTicket(null);
            setFile(null);
        }
    } catch (err) {
        console.log(err)
        setAlert('❌ Upload failed. Check server or network.');
        setListTicket(null);
        setFile(null);
    }
    };
  return (
    <>
        <Button onClick={handleOpen} sx={{backgroundColor:'black'}} variant='contained'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z"/></svg>
        Import Tasks
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h1">
                    Import Tasks
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize:'14px', mb: 2}}>
                    Please enter a JSON file with the tasks you want to import. <strong>Make sure that all the fields are filled.</strong>
                </Typography>
                <input onChange={handleFileSelected} id="input-b1" name="input-b1" type="file" className="file" data-browse-on-zone-click="true" accept=".json"/>
                <br />
                <Typography>
                <Box sx={{width:'100%', mt: 2}}>
                <Typography sx={{mb:2}}>
                    {alert}
                </Typography>
                {listTicket != null ? 
                <>
                    {[...listTicket].map((ticket, index)=>(
                        <p key={index}>{ticket['subject']} - {ticket['status']}</p>
                    ))}
                    <Button onClick={handleUpload} sx={{backgroundColor:'black', color:'white'}} variant="contained">Submit</Button>
                </>
                :<></>}
                </Box>
                </Typography>
            </Box>
        </Modal>
    </>
  );
}

export default ImportTickets;
