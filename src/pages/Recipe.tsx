import React, { Component } from 'react';
import { withAppContext } from '../components/AppContext';

class RecipePage extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		const props = this.props as any;
		const {recipeId} = props.match.params;
		return (
			<div className='recipePage'>
				Recipe Page {recipeId}
			</div>
		);
	}
}

export default withAppContext(RecipePage);
