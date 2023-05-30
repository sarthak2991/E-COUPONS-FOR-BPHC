import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./login";
import Loginstudent from "./login_student";
import Loginvendor from "./login_vendor";
import emoji from './istockphoto-1138913775-612x612.jpg'
import Studentorder from "./studentorder";
import Vendororder from "./vendororder";
import './index.css'
import Order from "./takeorder";
import Bill from "./bill";
import Transactionvendor from "./transaction_history_vendor";
import Balance from "./balance";
import Transactionstudent from "./transaction_history_student";
import Scan from "./scan";

// defining a single function for whole website
function App(){
    return (<>
    {/* handling of different html pages from single page */}
    <BrowserRouter>
    <Switch>
        <Route exact path='/'>
            <Login /> 
        </Route>
        <Route path='/loginvendor'>
            <Loginvendor />
        </Route>
        <Route path='/loginstudent'>
            <Loginstudent />
        </Route>
        <Route path='/studentorder'>
            < Studentorder />
        </Route>
        <Route path='/vendororder'>
            <Vendororder />
        </Route>
        <Route path='/takeorder'>
            <Order />
        </Route>
        <Route path='/bill'>
            <Bill />
        </Route>
        <Route path='/vendorhistory'>
            <Transactionvendor/>
        </Route>
        <Route path='/balance'>
            <Balance/>
        </Route>
        <Route path='/studenthistory'>
            <Transactionstudent />
        </Route>
        <Route path='/scan'>
            <Scan/>
        </Route>
        <Route path='*'>
            {<div id="title">Error!!Wrong path..</div>}
        </Route>
    </Switch>
    </BrowserRouter>
    {/* footer message for all pages */}
    <div id="footer">Made with love <img id="emoji" src={emoji} alt="love-emoji"/> from sarthak<br/>
    contact : 8469837819</div>
     </>
    )
}
// redering the above defined function
ReactDOM.render(<App />,document.getElementById('root'))
