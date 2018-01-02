import React, {Component} from 'react';
import './index.css';

export default class Team extends Component {
	state = {
		teamList:[{"id":"001","name":"遥不可及","time":"2018-01-02"},
				{"id":"002","name":"遥不可及","time":"2018-01-02"},
				{"id":"003","name":"遥不可及","time":"2018-01-02"},
		],
		popStyle:{display:"none"},
		popState:"0",//弹窗状态，0为添加队伍，1为修改信息
		useId:"",//被操作的队伍id
	}
	handleAddTeam = (e) => {
		var state = "0";
		var style = {display:"block"};
		this.setState({
			popStyle:style,
			popState:state,
		});
	}
	handleChangeTeam = (e,id) => {
		var state = "1";
		var style = {display:"block"};
		this.setState({
			popStyle:style,
			popState:state,
			useId:id,
		});
	}
	handleRemoveTeam = (e,id) => {
		alert("删除队伍,"+id)
	}
	handleSubmit = (e) => {
		if(this.state.popState=="0"){
			alert("添加队伍");
		}else{
			alert("修改信息,"+this.state.useId);
		}
		var style = {display:"none"};
		this.setState({
			popStyle:style,
		});
	}
	render() {
		const teamMess = this.state.teamList.map((mess,index)=>{
			console.log(mess,index)
			return(
				<tr key={index}><td>{mess.id}</td><td>{mess.name}</td><td>{mess.time}</td><td><button onClick={(e,id)=>{this.handleChangeTeam(e,mess.id)}}>修改信息</button><button onClick={(e,id)=>{this.handleRemoveTeam(e,mess.id)}}>删除队伍</button></td></tr>
			)
		})
		return (
			<div>
				<div className="header"><div><button onClick={this.handleAddTeam}>添加队伍</button></div></div>
				<table border="0" cellPadding="0" cellSpacing="0">
					<thead>
						<tr><th>队伍ID</th><th>队伍名称</th><th>注册时间</th><th>操作</th></tr>
					</thead>
					<tbody>
						{teamMess}
					</tbody>
				</table>
				<div className="teamPop" style={this.state.popStyle}>
					队伍名称
					<input type="text" />
					登陆密码
					<input type="password" />
					<div className="submitBox"><button onClick={this.handleSubmit}>提交</button></div>
				</div>
			</div>
		);
	}
}
