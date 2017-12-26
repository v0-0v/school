import React, {Component} from 'react';
import './index.css';
import {

  BrowserRouter as Router,

  Route

} from 'react-router-dom';
import Header from './indexHeader.js';

class ContentPage extends Component{
	render(){
		return(
			<div className="contentPage">
				<Router>
					<div>
					<Route exact path="/team" component={Header} />
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