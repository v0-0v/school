import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {

  BrowserRouter as Router,

  Route,

  Link

} from 'react-router-dom';
import Header from './indexHeader.js';

class ContentPage extends Component{
	render(){
		return(
			<div className="contentPage">
				<Router>
					<div>
					<Route exact path="/" component={Header} />
					<Route path="/subject" component={Header} />
					<Route path="/scoring" component={Header} />
					<Route path="/match" component={Header} />
					</div>
				</Router>
			</div>
		);
	}
}

export default ContentPage;