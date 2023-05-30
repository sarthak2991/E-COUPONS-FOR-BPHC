import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { headers } from './headers'

// defining component for student balance page
const Balance = () => {
  // initializing variables and getting values for some from local storage
    const id = localStorage.getItem('student_id')
    const [name,setName] = useState('')
    const [amount,setAmount] = useState(0)
    // sending id to backend and getting student_name and balance to frontend
    useEffect(()=>{axios.post('http://localhost:5000/balance',{id},{headers:headers}).then((res)=>{
        setName(res.data.name);setAmount(res.data.amount)})},[])
  return (
    <>
    {/*title of page */}
    <div id='title'>Balance</div>
    {/*Displaying student balance */}
    <div id='greetings'>
      
    <div>Name : {name.toUpperCase()}</div>
    <div>ID : {id}</div>
    <div>Amount : {amount}</div></div>
    {/*button for going back to order page */}
    <Link to='/studentorder'><button>Back to Order Page</button></Link>
    </>
  )
}

export default Balance