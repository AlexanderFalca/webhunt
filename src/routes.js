import React, { Component } from "react";
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from "./pages/main";
import Product from "./pages/product";

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" Component={Main}/> 
        <Route path="/products/:id" Component={Product} />
    </Switch>
    </BrowserRouter>
);
export default Routes;