import React, {Component} from 'react';
import './index.css';
import {

  BrowserRouter as Router,

  NavLink,

  Route

} from 'react-router-dom';
import Flag from './flag';
import Defense from './defense';

export default class Match extends Component {
	state = {
		scoringStyle:{borderBottom: "3px solid #0c7afe"},
	}
	handleLinkClick = (ev,index) => {
		var scoring = {};
		if(index===0){
			scoring={borderBottom: "3px solid #0c7afe"};
		}
		this.setState({
			scoringStyle:scoring,
		})
	}
	render() {
		return (
			<Router>
				<div className="scoringBox">
					<div className="header">
						<div className="linkBox">
							<NavLink to="/match" className="linkClass" style={this.state.scoringStyle} onClick={(ev,index)=>{this.handleLinkClick(ev,0)}}>夺旗竞赛模式</NavLink>
							<NavLink to="/match/defense" className="linkClass" activeStyle={{borderBottom: "3px solid #0c7afe"}} onClick={(ev,index)=>{this.handleLinkClick(ev,1)}}>攻防对抗模式</NavLink>
						</div>
					</div>
					<div className="scoringMess">
						<Route path="/match" exact component={Flag} />
						<Route path="/match/defense" exact component={Defense} />
					</div>
				</div>
			</Router>
		);
	}
}
