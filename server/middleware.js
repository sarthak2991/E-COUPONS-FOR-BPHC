const connect = require('./sqlconnection')

const vendorLogin = (req,res) => { 
    const contact = req.body;
connect.query('select name from vendor where phone_number='+ parseInt(contact.phoneno), (err,result)=>{
    if(!(result.length)){return res.json({status:'Error',data:''})}
else{
     vendorname = result[0].name;
    
    res.json({status:'Success',data:vendorname})
    }
    
})

 }

const takeOrder = (req,res) => {
    const vendorname = req.body.vendorname
    connect.query('select * from ' + vendorname,(err,result)=>{if(err){console.log('Error');}
else{const data={ 'items' : result};
res.send(data)}})}

const takeOrderbill = (req,res) => {if(req.body !== {}){
    const vendorname = req.body.vendorname
    const data = {data:req.body.items}
    const query = 'insert into transaction_history values(?,?,?,?,?)'
    if(vendorname){
    const transaction_id = Date.now()
    const prepared_query = connect.format(query,[transaction_id,vendorname,'',0,JSON.stringify(data)])
    
    connect.query(prepared_query,(err,result)=>{if(err){console.log(err);}else{res.json({status:'Success',transaction_id:transaction_id})}})
    
    }
    else{res.json({status:'Error',transaction_id:0})
    
}}}

const generateBill = (req,res) => {
    const parameters = req.query
    const query = 'select order_details,transaction_id from transaction_history where name=? and transaction_id=?'
    const prepared_query = connect.format(query,[parameters.name,parseInt(parameters.transaction_id)])
    connect.query(prepared_query,(err,result)=>{if(err){console.log(err);}
    else{  
        res.send((result))}}) }

const vendorHistory = (req,res) => {
    const vendorname = req.body.vendorname
    const query = 'select * from transaction_history where name=?'
const prepared_query = connect.format(query,[vendorname])
connect.query(prepared_query,(err,result)=>{if(err){console.log(err)}
else{
    res.send(result)}})}

const studentLogin = (req,res)=>{
        
    const query = 'select * from student where id=? and password=?'
    const prepared_query = connect.format(query,[req.body.id,req.body.password])
    connect.query(prepared_query,(err,result)=>{
    if(err){console.log(err)}
    else
    {
    
        if(result.length){res.send('Success')}
        else{res.send('Error')}
        }
})}

const studentOrder = (req,res) => {
    connect.query('select order_details from transaction_history where transaction_id='+parseInt(req.body.data),(err,result)=>{if(err){console.log(err)}
    const bill = JSON.parse(result[0].order_details).data
    let total = 0
    bill.forEach((element)=>{total+=(element.Price*element.quantity)})
    const query = 'select amount from student where id=?'
    const prepared_query = connect.format(query,[req.body.id])
    connect.query(prepared_query,(err,result)=>{if(err){
        console.log(err)
    }
const revised_total=result[0].amount-total
const query = 'update student set amount=? where id=?'
    const prepared_query = connect.format(query,[revised_total,req.body.id])
    connect.query(prepared_query)})
        
})
    const query = 'update transaction_history set id=?, status=? where transaction_id=?'
    const prepared_query = connect.format(query,[req.body.id,1,parseInt(req.body.data)])
    connect.query(prepared_query,(err,result)=>{if(err){
        console.log(err)
        res.send('Error')
    }else{res.send('Success')}})
}

const studentBalance = (req,res) => {
    const query = 'select name,id,amount from student where id=?'
    const prepared_query = connect.format(query,[req.body.id])
    connect.query(prepared_query,(err,result)=>{
        if(err){console.log(err)}
        else{
            res.json({name:result[0].name,id:result[0].id,amount: result[0].amount})
        }
    })

}
const studentHistory = (req,res) => {
    const query = 'select * from transaction_history where id=?'
const prepared_query = connect.format(query,[req.body.id])
connect.query(prepared_query,(err,result)=>{if(err){console.log(err)}
else{
    res.send(result)}})
}
module.exports = {vendorLogin,takeOrder,takeOrderbill,generateBill,vendorHistory,studentLogin, studentBalance,studentHistory, studentOrder}