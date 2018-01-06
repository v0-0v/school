var apiUrl = {
  basehostUrl: 'http://192.168.0.103:8080',
}

export default {
	//参赛队伍管理模块
	addTeam:apiUrl.basehostUrl+'/AddTeamServlet',//添加队伍
	updateTeam:apiUrl.basehostUrl+'/UpdateTeamServlet',//修改队伍信息
	deleteTeam:apiUrl.basehostUrl+'/DeleteTeamServlet',//删除队伍

	//题目flag管理模块
	addFlag:apiUrl.basehostUrl+'/AddFlagServlet',//添加题目
	updateFlag:apiUrl.basehostUrl+'/UpdateFlagServlet',//修改题目
	deleteFlag:apiUrl.basehostUrl+'/DeleteFlagServlet',//删除题目
	isStart:apiUrl.basehostUrl+'/IsStartServlet',//获取夺旗竞赛是否开始
	letStart:apiUrl.basehostUrl+'/LetStartServlet',//开始夺旗竞赛
	getStartTime:apiUrl.basehostUrl+'/GetStartTimeServlet',//获取夺旗竞赛开始时间

	//计分模块
	flag:apiUrl.basehostUrl+'/FlagServlet',//夺旗竞赛模式
	gf:apiUrl.basehostUrl+'/GFServlet',//攻防对抗模式
}
