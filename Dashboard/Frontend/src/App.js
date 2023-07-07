import './App.css';
import { useState } from "react"
import Homepage  from './pages/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'
import {Routes, Route} from 'react-router-dom';


///// navigation to be started at index.js, wrap app in <Router> component
const App = () => {

  const[ user, setLoginUser] = useState({})
  return (
    <div className="App">

          <Routes>
            <Route exact path = "/" element={<Login setLoginUser = {setLoginUser}/>}/>
            <Route path = "/register" element={<Register />}/>
            <Route path = "/homepage" element={
              user&&user._id ? <Homepage/> : <Login setLoginUser = {setLoginUser}/>
          }/>
          <Route path = "/homepage" element={<Homepage />}/>
          </Routes>
    </div>
  );
}

export default App;
