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
// defining a single function for whole application
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
    </Switch>
    </BrowserRouter>
    {/* footer message for all pages */}
    <div id="footer">Made with love <img src={emoji} alt="love-emoji" style={{'width': '40px', 'height': '40px'}}/> from sarthak<br/>
    contact : 8469837819</div>
     </>
    )
}
// redering the above defined function
ReactDOM.render(<App />,document.getElementById('root'))