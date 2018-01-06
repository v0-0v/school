import React, {Component} from 'react';
import './index.css';
import axios from 'axios';
import baseUrl from '../../config/url.js';
import up from "./img/up.png";
import down from "./img/down.png";
import flagImg from "./img/flag.png";

export default class Flag extends Component {
	state = {
		src:[],
		scoreStyle:[],
		scoring:[],
		// src:[down,down,down],//箭头图标
		// scoreStyle:[{display:"none"},{display:"none"},{display:"none"},],//队伍得分详情显示
		// scoring:[
		// 	{
		// 		team:"遥不可及",
		// 		flagNum:"2",
		// 		score:"78",
		// 		subject:[
		// 			{id:"140522101",grade:"20"},
		// 			{id:"140522102",grade:"13"},
		// 			{id:"140522103",grade:"9"},
		// 			{id:"140522104",grade:"20"},
		// 			{id:"140522105",grade:"16"},
		// 		]
		// 	},
		// 	{
		// 		team:"大智若愚",
		// 		flagNum:"1",
		// 		score:"63",
		// 		subject:[
		// 			{id:"140522101",grade:"10"},
		// 			{id:"140522102",grade:"20"},
		// 			{id:"140522103",grade:"17"},
		// 			{id:"140522104",grade:"12"},
		// 			{id:"140522105",grade:"4"},
		// 		]
		// 	},
		// 	{
		// 		team:"无坚不摧",
		// 		flagNum:"0",
		// 		score:"52",
		// 		subject:[
		// 			{id:"140522101",grade:"11"},
		// 			{id:"140522102",grade:"5"},
		// 			{id:"140522103",grade:"10"},
		// 			{id:"140522104",grade:"14"},
		// 			{id:"140522105",grade:"12"},
		// 		]
		// 	},
		// ]
	}
	handleTeamClick = (e,indexNum) => {
		var src = this.state.src;
		var scoreStyle = [];
		for(var i=0;i<this.state.scoring.length;i++){
			scoreStyle.push({display:"none"});
		}
		if(src[indexNum]===up){
			src[indexNum]=down;
		}else{
			src = [];
			for(var i=0;i<this.state.scoring.length;i++){
				src.push(down);
			}
			src[indexNum]=up;
			scoreStyle[indexNum]={display:"block"};
		}
		this.setState({
			src:src,
			scoreStyle:scoreStyle,
		})
	}
	componentWillMount() {
		//设置this.state.scoring和this.state.src与this.state.scoreStyle的个数
		var scoring = [];
		var src = [];
		var scoreStyle = [];
		axios.post(baseUrl.flag, {})
		.then(function (response) {
		    console.log(response);
		    scoring = response;
		})
		.catch(function (response) {
		    console.log(response);
		});
		for(var i=0;i<scoring.length;i++){
			src.push(down);
			scoreStyle.push({display:"none"});
		}
		this.setState({
			src:src,
			scoreStyle:scoreStyle,
			scoring:scoring,
		})
	}
	render() {
		const scoreMess = this.state.scoring.map((mess,index)=>{
			const subjectMess = mess.subject.map((subject,index)=>{
				let isFlagImg = null;
				if(subject.grade==="20"){
					isFlagImg = <img src={flagImg} alt="旗帜" className="flagImgClass"/>
				}
				return(
					<li key={index} className="teamBox">题目ID：{subject.id}<div className="teamMess">{isFlagImg}得分：<span className="score">{subject.grade}</span></div></li>
				)
			})
			return(
				<div key={index}>
					<div className="teamBox" onClick={(e,indexNum)=>this.handleTeamClick(e,index)}>
						<strong>{mess.team}</strong>
						<div className="teamMess">夺旗数：<span className="flag">{mess.flagNum}</span>总分：<span className="score">{mess.score}</span><img src={this.state.src[index]} alt="箭头"/></div>
					</div>
					<ul style={this.state.scoreStyle[index]}>
						{subjectMess}
					</ul>
				</div>
			)
		})
		return (
			<div className="scoreBox">
				{scoreMess}
			</div>
		);
	}
}