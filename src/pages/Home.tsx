import React, { Component } from 'react';
import { withAppContext } from '../components/AppContext';

class HomePage extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className='homePage'>
				Home Page
			</div>
		);
	}
}

export default withAppContext(HomePage);
