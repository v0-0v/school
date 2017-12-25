import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {

  BrowserRouter as Router,

  Route,

  Link

} from 'react-router-dom';

class NavBox extends Component{
	render(){
		return(
			<Router>
				<ul className="navBox">
					<li>
						<Link to="/team">参赛队伍管理</Link>
					</li>
					<li>
						<Link to="/subject">题目flag管理</Link>
					</li>
					<li>
						<Link to="/scoring">计分模块</Link>
					</li>
					<li>
						<Link to="/match">比赛模块</Link>
					</li>
				</ul>
			</Router>
		);
	}
}

export default NavBox;