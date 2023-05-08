import React, { useMemo, useState } from 'react'
import { Link} from 'react-router-dom/cjs/react-router-dom.min'
// vendor login component for vendor login page
const Loginvendor = () => {
  // defining different variables
  const [loggedin, setLoggedin] = useState('hi')
  const [otpgenerated,setOtpgenerated] = useState(0)
  const[otp,setOtp] = useState('')
  const [phoneno,setPhoneno] = useState('')
  // handling of otp obtained from client
  const handleOtp = (e) => {e.preventDefault()
    // condition for checking otp generated and otp obtained from client
    if (parseInt(otp) === otpgenerated){
  setLoggedin(true)}
    else{setLoggedin(false)}
    }
  // handling of data obtained from client
  const handleData = (e) => {
    e.preventDefault() 
    // checking for validity of phone number
    if(phoneno.length === 10 && isNaN(parseInt(phoneno)) === false){
    
      // generating a otp
      let otpgenerate = Math.floor(Math.random()*10000)
    if(otpgenerate<1000){otpgenerate+=1000}
    
      alert("Your OTP is " + otpgenerate);
      setOtpgenerated(otpgenerate)     
    } 
      else{
        alert('enter a valid phone number');
        setPhoneno('')
    }
}

  return (
    <>
      {/* title of page */}
        <div id='title'>Vendor Login </div>
        {/* taking input from client */}
        <form id='vendordetails'>
          <input id='phoneno' value={phoneno} onChange={(e) => {setPhoneno(e.target.value)}} placeholder="enter your phone no in form of 10 digits"></input>
          {/* changing value of button once otp is generated*/}
          {(otpgenerated)?(<button onClick={(e)=>{handleData(e)}}>Regenerate OTP</button>):(<button onClick={(e)=>{handleData(e)}}>Submit</button>)}
        </form>
        {/*taking otp from client once otp is generated */}
        {(otpgenerated)?( <>
    <form id='vendordetails' >
      <input value={otp} placeholder='enter otp' onChange={(e) => {setOtp(e.target.value)}}></input>
      <button onClick={(e)=>{handleOtp(e)}}>Submit</button>
      </form></>):(<></>)}
      {/* redirecting client to order page after verification */}
      {useMemo(()=>{if(loggedin === true){alert('login successful and redirecting to order page', window.location.href='/vendororder')} if(loggedin === false){alert('invalid otp'); setOtp('')} setLoggedin('hi')},[loggedin])}
      {/*button for going back to login page */}
        <Link to='/'><button id='backtohome' onClick={()=>{alert('redirecting back to home page')}}>Back To Login Page</button></Link>
    </>
  )  
}

export default Loginvendor