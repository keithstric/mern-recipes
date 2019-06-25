import React, { Component } from 'react';

import './style/App.css';
import Header from './components/layout/Header';
import Content from './components/layout/Content';

const App = (props: any) => {
	return (
		<React.Fragment>
			<Header />
			<Content>
				{props.children}
			</Content>
		</React.Fragment>
	);
}

export default App;
