import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBox from './NavBox.js';
import ContentPage from './ContentPage.js';

class ContentBox extends Component{
	render(){
		return(
			<div className="contentBox">
				<NavBox />
				<ContentPage />
			</div>
		);
	}
};

export default ContentBox;