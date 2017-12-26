import React, {Component} from 'react';
import './index.css';
import {

  BrowserRouter as Router,

  NavLink

} from 'react-router-dom';
import team1 from "./img/team1.png";
import team2 from "./img/team2.png";
import subject1 from "./img/subject1.png";
import subject2 from "./img/subject2.png";
import scoring1 from "./img/scoring1.png";
import scoring2 from "./img/scoring2.png";
import match1 from "./img/match1.png";
import match2 from "./img/match2.png";
class NavBox extends Component{
	state = {
		index:0,
		src:[team2,subject1,scoring1,match1],
		topStyle:{top:"82px"},
	}
	handleClick= (ev, index) => {
		var active = [];
		var Top = {top:(index*80+82)+"px"};
		console.log(Top);
		switch(index){
			case 0:active = [team2,subject1,scoring1,match1]; break;
			case 1:active = [team1,subject2,scoring1,match1]; break;
			case 2:active = [team1,subject1,scoring2,match1]; break;
			default:active = [team1,subject1,scoring1,match2]; break;
		}
    	this.setState({
            src: active,
            topStyle:Top,
        });
	}
	render(){
		return(
			<Router>
				<ul className="navBox">
					<li>
						<img src={this.state.src[0]} alt="icon" /><NavLink to="/team" className="navLink" activeStyle={{color:"#fff",background:"#0c7afe"}} onClick={(ev, index) => {this.handleClick(ev, 0)}}>参赛队伍管理</NavLink>
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
			</Router>
		);
	}
}

export default NavBox;