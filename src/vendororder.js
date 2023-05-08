import React from 'react'
import { Link } from 'react-router-dom'
// defining component for vendor order page
const Vendororder = () => {
  return (
    <>
    {/*title of page */}
    <div id='title'>Vendor Order</div>
    {/*defining different buttons for vendor order page */}
    <button>Take Order</button><br />
    <button>Transaction history</button><br />
    {/*button for logout */}
    <Link to='/'><button onClick={()=>{alert('redirecting back to home page')}}>Logout</button></Link>
    </>
  )
}

export default Vendororder