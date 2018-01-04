import React, {Component} from 'react';
import './index.css';

export default class Flag extends Component {
	state = {
		subjectList:[],
		matchState:false,//比赛是否开始
	}
	
	componentWillMount() {
		var subjectList=[];
		var matchState=false;
		//调用接口获取所有题目和ID，判断夺旗竞赛是否开始，若已开始,subjectList.name为所有题目，matchState为true。若未开始，subjectList.name全是“夺旗竞赛未开始”matchState为false
		subjectList=[{"id":"140522101","name":"1+1=?"},
				{"id":"140522102","name":"1+2=?"},
				{"id":"140522103","name":"1+3=?"},
				{"id":"140522104","name":"1+4=?"},
				{"id":"140522105","name":"1+5=?"},
		];
		matchState=true;
		this.setState({
			subjectList:subjectList,
			matchState:matchState,
		})
	}
	render() {
		const subjectList = this.state.subjectList.map((mess,index)=>{
			let subjectInp = null;
			if(this.state.matchState){
				subjectInp =<div><input type="text"/><button>提交该题</button></div>;
			}else{
				subjectInp =<div><input type="text" disabled="disabled"/><button disabled="disabled">提交该题</button></div>;
			}
			return(
				<div key={index} className="subjectListBox">
					第{index+1}题：{mess.name}
					{subjectInp}
				</div>
			)
		})
		return (
			<div className="matchFlagBox">
				{subjectList}
			</div>
		);
	}
}