import React,{useState, useEffect} from 'react'
import { headers } from './headers'
import axios from 'axios'
import image from './istockphoto-1138913775-612x612.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

// defining component for vendor take order page
const Order = () => {
  // initializing variables
  const vendorname = localStorage.getItem('vendorname')
  const [items,setItems] = useState([])
  
  // sending vendorname to backend and bring menu to frontend
  useEffect(()=>{axios.post('http://localhost:5000/takeorder',{vendorname},{headers:headers}).then((res) => {if(res !== 'Error'){setItems(res.data.items)} else{alert('Login timed out!! Please login again')} } )},[])
  // object to discard the items
  const handleDiscard = () => {items.map((data,index)=>{data.quantity = 0;document.getElementById(index).value='';return <></>});alert('Order Discarded Successfully')}
  // object to generate a bill
  const handleClick = () => {
    let quantity = 0
    items.map((data)=>{quantity += data.quantity; return quantity})
    if(quantity){axios.post('http://localhost:5000/takeorder/bill',{vendorname,items},{headers:headers}).then((res) => {if(res.data.status !== 'Error'){alert('Bill generated successfully');
    window.location.href='/bill?name='+vendorname+'&transaction_id='+ res.data.transaction_id;
  }
    else{alert('Login timed out!! Please login again'); window.location.href='/loginvendor'}})}
    else{alert('Please add some items to generate bill')}
  }
  return (
    <>
    {/*title of page */}
    <div id='title'>Take Order</div>
    {/* greetings for vendor */}
    <div id='greetings'>Welcome {vendorname}  <img src={image} id='emoji' alt='love' /></div>
    <div id='titlemenu'>Menu</div>
    {/*menu */}
    {(items.length)?(<>
    <div className='grid-container'>
      <div className='grid-item'>Item_Name </div>
      <div className='grid-item'>Price(Rs)</div>
      <div className='grid-item'>Quantity</div>
      
      {items.map((data,index)=>{
        return <>
        <div className='grid-item'>{data.Item_Name.toUpperCase()}</div>
        <div className='grid-item'>{data.Price}</div>
        <div className='grid-item'><input id={index} className='quantity' type='number' min={0} onChange={(e)=>{if(e.target.value !== ''){data.quantity=e.target.value}}} ></input></div></>})}</div>
    <div>
      {/*button for discarding order */}
      <button onClick={()=>{handleDiscard()}}>Discard Order</button>
      {/*button for generating a bill */}
      <button onClick={()=>{handleClick()}}>Generate Bill and QR</button></div></>):(<></>)}
    {/*button for going back to order page */}
    <div><Link to='/vendororder' ><button id='backtohome'>Back to Order Page</button></Link></div>
</>
  )
}

export default Order