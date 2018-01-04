import React, {Component} from 'react';
import './index.css';
import {

  BrowserRouter as Router,

  NavLink,

  Route,

} from 'react-router-dom';
import Flag from './flag';
import Defense from './defense';
const PropTypes = require('prop-types');


export default class Match extends Component {
	state = {
		scoringStyle:{borderBottom: "3px solid #0c7afe"},
		popStyle:{display:"block"},
		routeStyle:{display:"none"},
		teamName:"",//当前队伍名称
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
		e.preventDefault();
		//调用登陆接口，如果返回信息为登陆失败，则弹出弹窗提示，若成功:
		var popStyle={display:"none"};
		var routeStyle={display:"block"};
		var teamName = "遥不可及";
		this.setState({
			popStyle:popStyle,
			routeStyle:routeStyle,
			teamName:teamName,
		})
		  var path = "/match/"+teamName;
		  //this.props.history.push (path)
		  //this.context.router.history.push(path)
	}
	render() {
		return (
			<Router>
				<div className="scoringBox">
					<div className="header">
						<div className="linkBox">
							<NavLink to={"/match/"+this.state.teamName} className="linkClass" style={this.state.scoringStyle} onClick={(ev,index)=>{this.handleLinkClick(ev,0)}}>夺旗竞赛模式</NavLink>
							<NavLink to={"/match/defense/"+this.state.teamName} className="linkClass" activeStyle={{borderBottom: "3px solid #0c7afe"}} onClick={(ev,index)=>{this.handleLinkClick(ev,1)}}>攻防对抗模式</NavLink>
							<div className="curveBox">当前队伍名称：{this.state.teamName}</div>
						</div>
					</div>
					<div className="scoringMess" style={this.state.routeStyle}>
						<Route path="/match/:teamName" exact component={Flag} />
						<Route path="/match/defense/:teamName" exact component={Defense} />
					</div>
					<div className="subjectPop" style={this.state.popStyle}>
						队伍名称
						<input type="text" />
						登陆密码
						<input type="password" />
						<div className="submitBox"><button onClick={this.handleLogin}>提交</button></div>
					</div>
				</div>
			</Router>
		);
	}
}
Match.contextTypes = {
  router: PropTypes.object
 }
