import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { headers } from './headers'
import qr from 'qrcode'
import {Link} from 'react-router-dom'

// defining component for bill page
const Bill = () => {
  // initializing variables
  let total = 0
  const vendorname = localStorage.getItem('vendorname')
  const [src,setSrc] = useState('')
  const [items,setItems] = useState([])
  // getting parameters from url 
  const parameters = window.location.search
  // sending name and transaction_id to backend and getting transaction_id to frontend which is further converted to qr code
  useEffect(()=>{axios.get('http://localhost:5000/bill'+parameters,{headers:headers}).then((res)=>{if(res.data !== []){setItems(res.data)}})},[])
  if(items.length){qr.toDataURL(items[0].transaction_id.toString(),{type:'image/jpeg'}).then((res)=>{setSrc(res)})}
  
  return (
    <>
    {/*title of page */}
    <div id='title'>Bill</div>
    {/*designing a grid look for items, price, quantity and total */}
    {(items.length)?
    (<>
    <div id='greetings'>Name:{vendorname}<br/> Transaction_ID: {items[0].transaction_id}</div>
    <div className='grid-container1'>
      <div className='grid-item'>Item_Name</div>
      <div className='grid-item'>Price(Rs)</div>
      <div className='grid-item'>Quantity</div>
      <div className='grid-item'>Amount(Rs)</div>
      {
      JSON.parse(items[0].order_details).data.map((data)=>{
        total += data.Price * data.quantity
        return (
      <>
      <div className='grid-item'>{data.Item_Name.toUpperCase()}</div>
      <div className='grid-item'>{data.Price}</div>
      <div className='grid-item'>{data.quantity}</div>
      <div className='grid-item'>{data.Price * data.quantity}</div></>
      )})}
      <div className='grid-item'>Total(Rs)</div>
      <div className='grid-item'></div>
      <div className='grid-item'></div>
      <div className='grid-item'>{total}</div>
      
    </div>
    <br/>
    <img id='qrcode' src={src} alt='qrcode'/>
    
    </>):(<></>)}
    <br/>
    <br/>
    {/*button for goinf back to take order page */}
    <Link to='/takeorder'><button>Take New Order</button></Link>
    </>
  )
}

export default Bill