import React from 'react'
import { Link } from 'react-router-dom'
// defining the login page
const Login = () => {
  // setting up alert so as to tell user on which page user is moving to
  const handleClick = (e) => {
    alert('redirecting to ' + e.target.id)
  }
  return (
  <>
    {/* title of page */}
    <div id='title'>Login page</div>
    {/* links for vendor login and student login pages */}
    <div>
        <Link to='/loginvendor'><button id='vendor-login-page' onClick={(e)=>{handleClick(e)}}>Login for vendor</button></Link><br/>
        <Link to='/loginstudent'><button id='student-login-page' onClick={(e)=>{handleClick(e)}}>Login for students</button></Link>
    </div>
    </>
  )
}

export default Login