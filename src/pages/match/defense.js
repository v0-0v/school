import React, {Component} from 'react';
import './index.css';

export default class Defense extends Component {
	state = {
		teamList:[
			// {"id":"001","name":"遥不可及","time":"2018-01-02"},
			{"id":"002","name":"大智若愚","time":"2018-01-02"},
			{"id":"003","name":"无坚不摧","time":"2018-01-02"},
		],
		record:[
			{
				ways:"0",//0为攻击，1为防守
				rival:"大智若愚",//对手队伍
				state:"1",//状态，0为成功，1为失败
			},
			{
				ways:"0",//0为攻击，1为防守
				rival:"无坚不摧",//对手队伍
				state:"0",//状态，0为成功，1为失败
			},
			{
				ways:"1",//0为攻击，1为防守
				rival:"大智若愚",//对手队伍
				state:"1",//状态，0为成功，1为失败
			},
			{
				ways:"1",//0为攻击，1为防守
				rival:"无坚不摧",//对手队伍
				state:"1",//状态，0为成功，1为失败
			},
		],
		defense:"",//防守问题
		popStyle:{display:"none"},
		rival:"",//攻击队伍
	}
	handleTeamClick = (e,defenseIndex) => {
		var rival = this.state.teamList[defenseIndex].id;
		var popStyle = {display:"block"};
		var defense = "赵钱孙李，________?";
		this.setState({
			defense:defense,
			popStyle:popStyle,
			rival:rival,
		})
	}
	handleSubmit = (e) => {
		var popStyle = {display:"none"};
		alert(this.state.rival);
		console.log(this.props)
		this.setState({
			popStyle:popStyle,
		})
	}
	componentWillMount() {
		//获取teamList，和record，并把teamList中本队伍去掉
		console.log(this.props)
	}
	render() {
		const denfenseTeam = this.state.teamList.map((mess,index)=>{
			return(
				<div key={index} onClick={(e,defenseIndex)=>{this.handleTeamClick(e,index)}}>{mess.name}</div>
			)
		})
		const subjectMess = this.state.record.map((record,index)=>{
			let ways = null;
			let state = null;
			let score = null;
			if(record.ways==="0"){
				ways = "攻";
				if(record.state==="0"){
					state = <span className="defenseState">攻击成功</span>;
					score = <span className="defenseStateScore">+5</span>;
				}else{
					state = <span>攻击失败</span>;
					score = <span className="failScore">-5</span>;
				}
			}else{
				ways = "防";
				if(record.state==="0"){
					state = <span className="defenseState">防守成功</span>;
					score = <span className="defenseStateScore">+5</span>;
				}else{
					state = <span>防守失败</span>;
					score = <span className="failScore">-5</span>;
				}
			}

			return(
				<li key={index} className="teamBox">{ways}：{record.rival}<div className="teamMess">{state}攻击得分{score}</div></li>
			)
		})
		return (
			<div className="defenseBox">
				<div className="denfenseTeamBox">
					选择要攻击的队伍:
					{denfenseTeam}
				</div>
				攻防记录：
				<ul>
					{subjectMess}
				</ul>
				<div className="defensePop" style={this.state.popStyle}>
					您要攻破的题目为：<br/>
					<span>{this.state.defense}</span>
					<input type="text" />
					<div className="submitBox"><button onClick={this.handleSubmit}>提交</button></div>
				</div>
			</div>
		);
	}
}