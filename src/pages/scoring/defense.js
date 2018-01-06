import React, {Component} from 'react';
import './index.css';
import axios from 'axios';
import baseUrl from '../../config/url.js';
import up from "./img/up.png";
import down from "./img/down.png";

export default class Defense extends Component {
	state = {
		src:[],
		scoreStyle:[],
		scoring:[],
		// src:[down,down,down],//箭头图标
		// scoreStyle:[{display:"none"},{display:"none"},{display:"none"},],//队伍得分详情显示
		// scoring:[
		// 	{
		// 		team:"遥不可及",
		// 		attack:"50",//攻击得分
		// 		guard:"60",//防守得分
		// 		score:"110",//总分
		// 		record:[
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"大智若愚",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"无坚不摧",//对手队伍
		// 				state:"0",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"1",//0为攻击，1为防守
		// 				rival:"大智若愚",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"1",//0为攻击，1为防守
		// 				rival:"无坚不摧",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 		]
		// 	},
		// 	{
		// 		team:"大智若愚",
		// 		attack:"40",//攻击得分
		// 		guard:"55",//防守得分
		// 		score:"95",//总分
		// 		record:[
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"遥不可及",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"无坚不摧",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"1",//0为攻击，1为防守
		// 				rival:"遥不可及",//对手队伍
		// 				state:"0",//状态，0为成功，1为失败
		// 			},
		// 		]
		// 	},
		// 	{
		// 		team:"无坚不摧",
		// 		attack:"35",//攻击得分
		// 		guard:"50",//防守得分
		// 		score:"85",//总分
		// 		record:[
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"大智若愚",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"无坚不摧",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
		// 			{
		// 				ways:"0",//0为攻击，1为防守
		// 				rival:"大智若愚",//对手队伍
		// 				state:"1",//状态，0为成功，1为失败
		// 			},
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
		axios.post(baseUrl.gf, {})
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
			const subjectMess = mess.record.map((record,index)=>{
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
			return(
				<div key={index}>
					<div className="teamBox" onClick={(e,indexNum)=>this.handleTeamClick(e,index)}>
						<strong>{mess.team}</strong>
						<div className="teamMess">攻击得分：<span>{mess.attack}</span> 防守得分：<span>{mess.guard}</span> 总分：<span className="defenseScore">{mess.score}</span><img src={this.state.src[index]} alt="箭头"/></div>
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