import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import Todo from "./pages/Todo";
import { createHashHistory } from "history";

ReactDOM.render((
    <Router history={createHashHistory()}>
        <Route path="/" component={Todo}></Route>
    </Router>
), document.getElementById("app"));