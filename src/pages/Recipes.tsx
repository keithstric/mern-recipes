import React, { Component } from 'react';
import { withAppContext } from '../components/AppContext';

class RecipesPage extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="recipesPage">
				Recipes Page
			</div>
		);
	}
}

export default withAppContext(RecipesPage);
