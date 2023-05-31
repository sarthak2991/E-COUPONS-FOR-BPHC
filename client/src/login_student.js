import React, { useMemo, useState } from 'react'
import { Link} from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { headers} from './headers'
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'
import jwtDecode from "jwt-decode";
import data from './client_secret'

// defining component for student login page
const Loginstudent = () => {
  // defining variables
  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [loggedin,setLoggedin] = useState('hi')
  const [show,setShow] = useState(false)
  // handling and verifying data recieved from client side
const handleClick =(e)=>{
  e.preventDefault()
  axios.post('http://localhost:5000/studentlogin',{id:id,password:password},{headers:headers}).then((res)=>{
    if(res.data !== 'Error'){
      setLoggedin(true);
      localStorage.setItem('student_id',id)}
      else{setLoggedin(false)}})
  

setId('')
setPassword('')}


  return (
    <>
      {/*title of page */}
      <div id='title'>Student Login</div>
      {/*taking input from client */}
        <form >
          <input placeholder='enter id in format of f20xxxxxx' value={id} onChange={(e) => {setId(e.target.value)}}></input><br />
          {(show)?(<input placeholder='enter your password' value={password} type='text' onChange={(e) => {setPassword(e.target.value)}}></input>):(<input placeholder='enter your password' value={password} type='password' onChange={(e) => {setPassword(e.target.value)}}></input>)}
          <br />
          {/*button for showing up and hiding the password */}
          {(show)?(<button onClick={(e)=>{e.preventDefault();setShow(false)}}>Hide Password</button>):(<button onClick={(e)=>{e.preventDefault();setShow(true)}}>Show Password</button>)}
          <button onClick={(e)=>{handleClick(e)}}>Submit</button><br />
          
        </form>
        {/*Google OAuth */}
        {/*client id recieved from google api */}
        <div id='googleauth'><GoogleOAuthProvider clientId={data.web.client_id}>
    <GoogleLogin 
    type='standard'
    size='medium'
    logo_alignment='center'
    width='200px'
  onSuccess={(credentialResponse) => {
    const credential =jwtDecode(credentialResponse.credential)
    if(credential.hd === 'hyderabad.bits-pilani.ac.in'){
    setId(credential.email.slice(0,9))
    setLoggedin(true)
    
  }
    else{alert('Please use your bits mail to login')}
    

  }}
  onError={() => {
    alert('Login Failed');
  }}
  useOneTap
/>;
</GoogleOAuthProvider></div>

        {/*redirecting client to order page after verifying */}
        {useMemo(()=>{if(loggedin === true){alert('login successful and redirecting to order page'); 
        localStorage.setItem('student_id',id)
        window.location.href='/studentorder'; 
        } if(loggedin === false){alert('invalid credentials')} setLoggedin('hi')},[loggedin])}
        {/*button for getting back to login page */}
        <Link to='/'><button id='backtohome' onClick={()=>{alert('redirecting back to home')}}>Back To Login Page</button></Link>
    </>
  )
}

export default Loginstudent