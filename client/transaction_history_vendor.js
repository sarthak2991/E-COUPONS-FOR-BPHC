import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { headers } from './headers'
import { Link } from 'react-router-dom/cjs/react-router-dom'

// defining component for transaction history for vendor page
const Transactionvendor = () => {
  // intializing variables
    const vendorname = localStorage.getItem('vendorname')
    const [items,setItems] = useState([])
    // sending vendorname to backend and getting transaction history of vendor to frontend
    useEffect(()=>{axios.post('http://localhost:5000/vendorhistory',{vendorname},{headers:headers}).then((res)=>{if(res.data !== []){setItems(res.data)}})},[])
    
  return (
    <>
    {/*title of page */}
    <div id='title'>Transaction History</div>
    {/*greeting for vendor */}
    <div id='greetings'>Welcome {vendorname}</div>
    {/*transaction history of vendor */}
    {(items.length)?
        (<><div className='grid-container1'>
          <div className='grid-item'>Transaction_ID</div>
          <div className='grid-item'>Order Details</div>
          <div className='grid-item'>ID</div>
          <div className='grid-item'>Status</div>
          {items.map((data)=>{
            var order_details = JSON.parse(data.order_details).data
            return (
          <>
          <div className='grid-item'>{data.transaction_id}</div>
          <div className='grid-item'>{order_details.map((data)=>{return <> {data.Item_Name.toUpperCase()}:{data.quantity}, </>})}</div>
          <div className='grid-item'>{data.id}</div>
          <div className='grid-item'>{(data.status)?(<>Success</>):(<>Failed</>)}</div></>
          )})}
        </div></>):(<div id='greetings'>No transactions to display</div>)}
        {/*button for going back to order page */}
        <Link to='/vendororder'><button>Back to Order Page</button></Link>
</>
  )
}

export default Transactionvendor