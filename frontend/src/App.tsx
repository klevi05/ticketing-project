import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './components/home/home'
//all the routes of the project will go under this file 
//follow the same structure
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
