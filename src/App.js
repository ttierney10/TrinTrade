import React from 'react';
import { Route } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Sell from "./components/Sell.js";
import CreateSale from "./components/CreateSale.js";
import Account from "./components/Account.js";
import Lists from "./components/Lists.js";
import Messages from "./components/Messages.js";
import EditSale from "./components/EditSale.js";
import Item from "./components/Item.js";
import User from "./components/User.js";

function App(props) {

  return (
    <div className="app_container">
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/sell/new-sale" component={CreateSale} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/lists" component={Lists} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/sale/edit-sale/:id" component={EditSale} />
      <Route exact path="/item/:id" component={Item} />
      <Route exact path="/user/:id" component={User} />
    </div>
  );
}

export default App;
