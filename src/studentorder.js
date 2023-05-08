import React from 'react'
import { Link } from 'react-router-dom'
// defining component for student order page
const Studentorder = () => {
  return (
    <>
    {/*title of page */}
    <div id='title'>Student Order Page</div>
    <div>
    {/*defining different button for various jobs */}
    <button>Scan QR</button><br />
    <button>Transaction history</button><br />
    <button>Current balance</button><br />
    {/*button for logging out */}
    <Link to='/'><button onClick={()=>{alert('redirecting back to home page')}}>Logout</button></Link></div>
    </>
  )
}

export default Studentorder