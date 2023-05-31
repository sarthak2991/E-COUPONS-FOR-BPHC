// importing module
const express = require('express')
const cors = require('cors')
const connect = require('./sqlconnection')
const {vendorLogin,takeOrder,takeOrderbill,generateBill, vendorHistory , studentLogin, studentBalance, studentHistory, studentOrder} = require('./middleware')

// using imported modules over whole server
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// query for connecting database
connect.query('use ecoupons')


// getting vendor credentials

app.post('/vendorlogin',vendorLogin)

// getting order details from vendor side
app.post('/takeorder',takeOrder)

// inserting order history in transaction history
app.post('/takeorder/bill',takeOrderbill)

// sending generated bill
app.get('/bill',generateBill)

// sending vendor history from database
app.post('/vendorhistory', vendorHistory)

// getting student credentials
app.post('/studentlogin',studentLogin)

// getting student order details
app.post('/studentorder',studentOrder)

// sending student balance
app.post('/balance',studentBalance)

// sending student history from database
app.post('/studenthistory',studentHistory)
app.listen(5000)