import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { headers } from './headers'

// defining component for transaction history page for student
const Transactionstudent = () => {
  // initializing variables
    const id = localStorage.getItem('student_id')
    const [items,setItems] = useState([])
    // sending student id to backend and getting student transaction history to frontend
    useEffect(()=>{axios.post('http://localhost:5000/studenthistory',{id},{headers:headers}).then((res)=>{if(res.data !== []){setItems(res.data)}})},[])
  return (
  <>
  {/*title of page */}
    <div id='title'>Transaction student</div>
    {/*transaction history of student */}
    {(items.length)?
        (<><div className='grid-container'>
          <div className='grid-item'>Transaction_ID</div>
          <div className='grid-item'>Order Details</div>
          <div className='grid-item'>Status</div>
          {items.map((data)=>{
            var order_details = JSON.parse(data.order_details).data
            return (
          <>
          <div className='grid-item'>{data.transaction_id}</div>
          <div className='grid-item'>{order_details.map((data)=>{return <> {data.Item_Name.toUpperCase()}:{data.quantity}, </>})}</div>
          <div className='grid-item'>{(data.status)?(<>Success</>):(<>Failed</>)}</div></>
          )})}
        </div></>):(<div id='greetings'>No transactions to display</div>)}
        {/*button for going back to order page */}
        <Link to='/studentorder'><button>Back to Order Page</button></Link>
</>

  )
}

export default Transactionstudent