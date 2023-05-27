
import React from 'react'
import { Link } from 'react-router-dom'
import image from './istockphoto-1138913775-612x612.jpg'

// defining component for vendor order page
const Vendororder = () => {
  const vendorname = localStorage.getItem('vendorname')
  
  return (
    <>
    {/*title of page */}
    <div id='title'>Vendor Order</div>
    <div id='greetings'>Welcome {vendorname}  <img src={image} id='emoji' alt='love' /></div>
    {/*defining different buttons for vendor order page */}
    <Link to='/takeorder'><button>Take Order</button></Link>
    <br />
    <Link to='/vendorhistory'><button>Transaction history</button></Link><br />
    {/*button for logout */}
    <Link to='/'><button onClick={()=>{alert('redirecting back to home page')}}>Logout</button></Link>
    </>
  )
}

export default Vendororder