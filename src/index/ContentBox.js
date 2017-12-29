import React, {Component} from 'react';
import './index.css';
import NavBox from './NavBox.js';
import ContentPage from './ContentPage.js';

var H = document.documentElement.clientHeight;
console.log(H);
var HeightStyle = {height:(H-62)+"px"}

class ContentBox extends Component{
	render(){
		return(
			<div className="contentBox" style={HeightStyle}>
				<NavBox />
				<ContentPage />123
			</div>
		);
	}
};

export default ContentBox;