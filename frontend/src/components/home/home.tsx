import './home.css';
import Navbar from '../navbar/navbar';
function Home(){
    return(
        <>
        <div>
            <Navbar/>
        </div>
        <div className='home'>
            <h1>Wellcome to STS</h1>
        </div>
        </>
    )
}

export default Home