import React,{useEffect,useState} from 'react'
import jsQR from 'jsqr';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {headers} from './headers'

// defining component for scan qr page
const Scan = () => {
  // initializing variables
  const id = localStorage.getItem('student_id')
  const [localstream,setLocalstream] = useState('')
  const constraints = {
    audio: false,
    video: {width:700, height:700,facingMode:'user', }
  };
  const [status,setStatus] = useState(false)
  // defining capture function
  function capture () {
    // initializing variables
    const canvas = document.querySelector("canvas");
const video = document.querySelector("video");
canvas.width = 700
canvas.height = 700
// using canvas element to capture a image from video stream
const ctx = canvas.getContext("2d")
ctx.drawImage(video,0,0,700,700)
  // converting the image capture to ImageData format
  const data = ctx.getImageData(0,0,700,700)
  // using jsqr to decode the qr code in image
  const code = jsQR(data.data,data.width,data.height)
  console.log(code)
  // sending the decoded value of qr code to backend to make transaction
  if(code){
    const data = code.data;axios.post('http://localhost:5000/studentorder',{data,id},{headers:headers}).then((res)=>{
    if(res.data==='Success'){setStatus(true);alert('Transaction Successful!!!');window.location.href='/studentorder'}
    else if(res.data === 'Payment already done'){alert('Payment already done');window.location.href='/studentorder'}
    else{alert('Transaction Failed!!');window.location.href='/studentorder'}
  })
}
}


  // starting camera to get the video stream
  useEffect(()=>{navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    const video = document.querySelector('video')
  video.srcObject = stream
    setLocalstream(stream) 
  video.play();}).catch((err)=>{console.log(err)})
 
},[])
// stoping camera once scan qr page is closed
const handleClick = () => {localstream.getTracks().forEach(function(track){track.stop()})}
  return (
    <>
    {/*title of page */}
    <div id='title'>Scan QR</div>
    <div id='instructions'>Please align the qr code so that it can be seen in screen and click on capture button</div>
    <video id='video'></video>
    <canvas id='canvas'></canvas>
    {/*continuous capturing of image from video stream*/}
    {(localstream)?((status)?(<></>):(setInterval(capture,5000))):(<></>)}
    {/*button to go back to order page */}
    <Link to='/studentorder'><button onClick={()=>{handleClick()}}>Back to Order Page</button></Link>
    </>


  )
}

export default Scan