import TextField from '@mui/material/TextField';
import Navbar from '../navbar/navbar'
import Alert from '@mui/material/Alert';
import './signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
function Signup(){
    const navigate = useNavigate()
    const [alert, setAlert] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [team, setTeam] = useState('');
    function handleSignUp(){
        if(name && email && password && team != ''){
            console.log('sent')
            navigate('/',{replace: true})
        } else{
            setAlert('One of the fields is empty!')
        }
    }
    return(
        <>
        <div>
            <Navbar/>
            <div className='signupPage'>
                {alert==='' ? <><p></p></> :<Alert style={{marginBottom: '1rem'}} severity="warning">{alert}</Alert>}
                <div className='signupForm'>
                    <h4>Sign Up</h4>
                    <TextField
                    id="name"  
                    label='Name'
                    variant="standard" 
                    type='text'
                    required
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                    <TextField 
                    id="email" 
                    label="Email" 
                    type='email'
                    variant="standard"
                    required
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <TextField 
                    id="password" 
                    label="Password"
                    type='password' 
                    variant="standard"
                    required
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <TextField 
                    id="password" 
                    label="Team" 
                    variant="standard"
                    type='text'
                    required
                    onChange={(e)=>{setTeam(e.target.value)}}
                    />
                    <button onClick={handleSignUp} className='signupButton'>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup