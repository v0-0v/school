import React, {Component} from 'react';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './indexHeader.js';
import Team from '../pages/team';
import Subject from '../pages/subject';
import Scoring from '../pages/scoring';
import Match from '../pages/match';

class ContentPage extends Component{
	render(){
		return(
			<div className="contentPage">
				<Router>
					<div>
					<Route path="/team" component={Team} />
					<Route path="/subject" component={Subject} />
					<Route path="/scoring" component={Scoring} />
					<Route path="/match" component={Match} />
					</div>
				</Router>
			</div>
		);
	}
}

export default ContentPage;