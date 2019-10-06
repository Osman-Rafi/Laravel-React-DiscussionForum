import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import Index from './index';
import CreateQuestion from './CreateQuestion';
import EditQuestion from './EditQuestion';
import ShowQuestion from './ShowQuestion';
import DeleteQuestion from './DeleteQuestion'




const routing = (
    <Router>
        <Route exact path="/" component={Index} />
        <Route path="/create-question" component={CreateQuestion}/>
        <Route exact path="/show-question/:id" component={ShowQuestion}/>
        <Route exact path="/edit-question/:id" component={EditQuestion}/>
        <Route exact path="/delete-question/:id" component={DeleteQuestion}/>
    </Router>
);


if (document.getElementById('example')) {
    ReactDOM.render(routing, document.getElementById('example'));
}
