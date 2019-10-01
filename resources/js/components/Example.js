import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Index from './index';

/*var moment = require('moment');
/!*moment().format();*!/
console.log(moment());*/

const routing = (
    <Router>
        <div>
            <Route path="/" component={Index}/>
        </div>
    </Router>
);
if (document.getElementById('example')) {
    ReactDOM.render(routing, document.getElementById('example'));
}
