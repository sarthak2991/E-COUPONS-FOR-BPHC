import React from 'react'
import { Link } from 'react-router-dom'
// defining component for student order page
const Studentorder = () => {
  return (
    <>
    {/*title of page */}
    <div id='title'>Student Order</div>
    <div>
    {/*defining different button for various jobs */}
    <Link to='/scan'><button>Scan QR</button></Link><br />
    <Link to='/studenthistory'><button>Transaction history</button></Link><br />
    <Link to='/balance'><button>Current balance</button><br /></Link>
    {/*button for logging out */}
    <Link to='/'><button onClick={()=>{alert('redirecting back to home page')}}>Logout</button></Link></div>
    </>
  )
}

export default Studentorder