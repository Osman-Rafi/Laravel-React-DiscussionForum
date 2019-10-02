import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import Index from './index';
import CreateQuestion from './CreateQuestion';




const routing = (
    <Router>
        <Route exact path="/" component={Index} />
        <Route path="/create-question" component={CreateQuestion}/>
    </Router>
);


if (document.getElementById('example')) {
    ReactDOM.render(routing, document.getElementById('example'));
}
