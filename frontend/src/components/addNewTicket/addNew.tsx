import Navbar from "../navbar/navbar";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
function AddNew(){
    const navigate = useNavigate();
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
    return(
        <>
            <Navbar/>
            {
                loged? 
                <>
                <h1>Hello</h1>
                </> : <> </>
            }
        </>
    )
}
export default AddNew;