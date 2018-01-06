import React, {Component} from 'react';
import './index.css';
import axios from 'axios';
import baseUrl from '../../config/url.js';

export default class Subject extends Component {
	state = {
		subjectList:[{"id":"140522101","name":"1+1=?","team":"暂无"},
				{"id":"140522102","name":"1+2=?","team":"遥不可及"},
				{"id":"140522103","name":"1+3=?","team":"暂无"},
				{"id":"140522104","name":"1+4=?","team":"暂无"},
				{"id":"140522105","name":"1+5=?","team":"暂无"},
		],
		popStyle:{display:"none"},
		popState:"0",//弹窗状态，0为添加题目，1为修改题目
		popMess:"您要添加的题目为?",//弹窗内文字信息
		useId:"",//被操作的题目id
		restTime:"未开始",
		isStart:false,//比赛是否开始
		flag:"",//要提交的题目详情
		answer:"",//要提交的题目答案
	}
	handleAddSubject = (e) => {
		var state = "0";
		var mess = "您要添加的题目为?";
		var style = {display:"block"};
		this.setState({
			popState:state,
			popMess:mess,
			popStyle:style,
		})
	}
	handleChaneSubject = (e,id) => {
		var state = "1";
		var mess = "您要将该题目修改为?";
		var style = {display:"block"};
		this.setState({
			popState:state,
			popMess:mess,
			popStyle:style,
			useId:id,
		})
	}
	handleRemoveSubject = (e,id) =>{
		alert("删除队伍,"+id)
		axios.post(baseUrl.deleteFlag, {
	        id: id,
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (response) {
		    console.log(response);
		});
	}
	handleSubmit = (e) => {
		if(this.state.popState==="0"){
			alert("添加题目");
			axios.post(baseUrl.addFlag, {
		        flag: this.state.flag,
		        answer: this.state.answer
			})
			.then(function (response) {
			    console.log(response);
			})
			.catch(function (response) {
			    console.log(response);
			});
		}else{
			alert("修改题目,"+this.state.useId);
			axios.post(baseUrl.updateFlag, {
				id:this.state.useId,
		        flag: this.state.flag,
		        answer: this.state.answer
			})
			.then(function (response) {
			    console.log(response);
			})
			.catch(function (response) {
			    console.log(response);
			});
		}
		var style = {display:"none"};
		this.setState({
			popStyle:style,
		});
	}
	handleStartGame = (e) => {
		if(this.state.isStart){//如果比赛已经开始
			alert("比赛已经开始");
		}else{
			//向后台提交当前时间为开始时间
			var nowTime = new Date();
			axios.post(baseUrl.letStart, {
		        startTime: nowTime
			})
			.then(function (response) {
			    console.log(response);
			})
			.catch(function (response) {
			    console.log(response);
			});
			var isStart = true;
			var str = "30m00s";
			this.setState({
				restTime:str,
				isStart:isStart,
			})
		}
	}
	countDownTime = (e) => {
		var dataStart = "";
		axios.post(baseUrl.getStartTime, {})
		.then(function (response) {
		    console.log(response);
		     dataStart = response;
		})
		.catch(function (response) {
		    console.log(response);
		});
		//var dataStart = new Date(2018,1,2,18,40,0);//获取开始时间
		var hoursStart = dataStart.getHours();
		var minStart = dataStart.getMinutes();
		var secStart = dataStart.getSeconds();
		var timer = setInterval(function(){
			var dataNow = new Date();//获取现在时间
			var hoursNow = dataNow.getHours();
			var minNow = dataNow.getMinutes();
			var secNow = dataNow.getSeconds();
			var hou = hoursNow-hoursStart;
			var min = hou*60+(minNow-minStart);
			var sec = 1800-(min*60+(secNow-secStart));
			var str = "";
			if(sec>0){
				str = parseInt(sec/60,0)+"m"+parseInt(sec%60,0)+"s";//30分钟比赛的剩余时间
			}else{
				str = "比赛结束，重新设置时间";
				clearInterval(timer);
			}
			this.setState({
				restTime:str,
			});
		}.bind(this),1000);
	}
	handleChange = (e) =>{
		var newState={};
		newState[e.target.name]=e.target.value;
		this.setState(newState);
	}
	componentWillMount() {
		var isStart = false;//比赛是否开始
		axios.post(baseUrl.isStart, {})
		.then(function (response) {
		    console.log(response);
		    isStart = response==="1"?true:false;
		})
		.catch(function (response) {
		    console.log(response);
		});
		if(isStart){
			this.countDownTime()
			this.setState({
				isStart:isStart,
			});
		}
	}
	componentDidMount() {
		if(this.state.isStart){//如果比赛已经开始
			this.countDownTime();
		}
	}
	componentDidUpdate() {
		if(this.state.isStart){//如果比赛开始
			this.countDownTime();
		}
	}
	render() {
		const teamMess = this.state.subjectList.map((mess,index)=>{
			console.log(mess,index)
			return(
				<tr key={index}><td>{mess.id}</td><td>{mess.name}</td><td>{mess.team}</td><td><button onClick={(e,id)=>{this.handleChaneSubject(e,mess.id)}}>修改题目</button><button onClick={(e,id)=>{this.handleRemoveSubject(e,mess.id)}}>删除题目</button></td></tr>
			)
		})
		return (
			<div>
				<div className="header">
					<div>
						<button onClick={this.handleAddSubject}>添加题目</button><button onClick={this.handleStartGame}>夺旗竞赛开始</button>
						<span>夺旗竞赛剩余时间:<strong>{this.state.restTime}</strong></span>
					</div>
				</div>
				<table border="0" cellPadding="0" cellSpacing="0">
					<thead>
						<tr><th>题目ID</th><th>题目详情</th><th>夺旗队伍</th><th>操作</th></tr>
					</thead>
					<tbody>
						{teamMess}
					</tbody>
				</table>
				<div className="subjectPop" style={this.state.popStyle}>
					{this.state.popMess}
					<input type="text" name="flag" onChange={this.handleChange} value={this.state.flag} />
					正确答案为？
					<input type="text" name="answer" onChange={this.handleChange} value={this.state.answer} />
					<div className="submitBox"><button onClick={this.handleSubmit}>提交</button></div>
				</div>
			</div>
		);
	}
}
