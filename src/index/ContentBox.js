import React, {Component} from 'react';
import './index.css';
import {

  BrowserRouter as Router,

  NavLink,

  Route

} from 'react-router-dom';
import team1 from "./img/team1.png";
import team2 from "./img/team2.png";
import subject1 from "./img/subject1.png";
import subject2 from "./img/subject2.png";
import scoring1 from "./img/scoring1.png";
import scoring2 from "./img/scoring2.png";
import match1 from "./img/match1.png";
import match2 from "./img/match2.png";

import Team from '../pages/team';
import Subject from '../pages/subject';
import Scoring from '../pages/scoring';
import Match from '../pages/match';

var H = document.documentElement.clientHeight;
console.log(H);
var HeightStyle = {height:(H-62)+"px"}

class ContentBox extends Component{
	state = {
		src:[team2,subject1,scoring1,match1],
		topStyle:{top:"82px"},
		teamStyle:{color:"#fff",background:"#0c7afe"},
	}
	handleClick= (ev, index) => {
		var active = [];
		var Top = {top:(index*80+82)+"px"};
		var Team = {};
		console.log(Top);
		switch(index){
			case 0:
				active = [team2,subject1,scoring1,match1]; 
				Team = {color:"#fff",background:"#0c7afe"};
				break;
			case 1:active = [team1,subject2,scoring1,match1]; break;
			case 2:active = [team1,subject1,scoring2,match1]; break;
			default:active = [team1,subject1,scoring1,match2]; break;
		}
    	this.setState({
            src: active,
            topStyle:Top,
            teamStyle:Team,
        });
	}
	render(){
		return(
			<Router>
				<div className="contentBox" style={HeightStyle}>
					<ul className="navBox">
						<li>
							<img src={this.state.src[0]} alt="icon" /><NavLink to="/" className="navLink" style={this.state.teamStyle} onClick={(ev, index) => {this.handleClick(ev, 0)}}>参赛队伍管理</NavLink>
						</li>
						<li>
							<img src={this.state.src[1]} alt="icon" /><NavLink to="/subject" className="navLink" activeStyle={{color:"#fff",background:"#0c7afe"}} onClick={(ev, index) => {this.handleClick(ev, 1)}}>题目flag管理</NavLink>
						</li>
						<li>
							<img src={this.state.src[2]} alt="icon" /><NavLink to="/scoring" className="navLink" activeStyle={{color:"#fff",background:"#0c7afe"}} onClick={(ev, index) => {this.handleClick(ev, 2)}}>计分模块</NavLink>
						</li>
						<li>
							<img src={this.state.src[3]} alt="icon" /><NavLink to="/match" className="navLink" activeStyle={{color:"#fff",background:"#0c7afe"}} onClick={(ev, index) => {this.handleClick(ev, 3)}}>比赛模块</NavLink>
						</li>
						<div className="navArrow" style={this.state.topStyle}></div>
					</ul>
					<div className="contentPage"> 
						<Route path="/" exact component={Team} />
						<Route path="/subject" exact component={Subject} />
						<Route path="/scoring" exact component={Scoring} />
						<Route path="/match" exact component={Match} />
					</div>
				</div>
			</Router>
		);
	}
}

export default ContentBox;