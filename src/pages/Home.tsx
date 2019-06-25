import React, { Component } from 'react';
import { withAppContext, IAppContext } from '../components/AppContext';
import { RouteComponentProps } from 'react-router';

interface IHomePageProps extends RouteComponentProps{
	appContext: IAppContext;
}
class HomePage extends Component<IHomePageProps> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		this.props.appContext.setHeader('M.E.R.N Recipes');
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
