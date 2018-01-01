import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './index/indexHeader.js';
import ContentBox from './index/ContentBox.js';

class SiteIndex extends Component{
	render (){
		return(
			<div>
				<Header />
				<ContentBox />
			</div>
		);
	}
};

ReactDOM.render(
	<SiteIndex />,
	document.getElementById('root')
);