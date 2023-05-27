const express = require('express')
const cors = require('cors')
const connect = require('./sqlconnection')
const {vendorLogin,takeOrder,takeOrderbill,generateBill, vendorHistory , studentLogin, studentBalance, studentHistory, studentOrder} = require('./middleware')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

connect.query('use ecoupons')




app.post('/vendorlogin',vendorLogin)


app.post('/takeorder',takeOrder)


app.post('/takeorder/bill',takeOrderbill)


app.get('/bill',generateBill)


app.post('/vendorhistory', vendorHistory)

app.post('/studentlogin',studentLogin)
app.post('/studentorder',studentOrder)

app.post('/balance',studentBalance)

app.post('/studenthistory',studentHistory)
app.listen(5000)