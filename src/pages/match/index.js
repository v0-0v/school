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
		popStyle:{display:"block"},
		routeStyle:{display:"none"},
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
	handleLogin=(e) =>{
		//调用登陆接口，如果返回信息为登陆失败，则弹出弹窗提示，若成功:
		var popStyle={display:"none"};
		var routeStyle={display:"block"};
		this.setState({
			popStyle:popStyle,
			routeStyle:routeStyle,
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
					<div className="scoringMess" style={this.state.routeStyle}>
						<Route path="/match" exact component={Flag} />
						<Route path="/match/defense" exact component={Defense} />
					</div>
					<div className="subjectPop" style={this.state.popStyle}>
						队伍名称
						<input type="text" />
						登陆密码
						<input type="text" />
						<div className="submitBox"><button onClick={this.handleLogin}>提交</button></div>
					</div>
				</div>
			</Router>
		);
	}
}
