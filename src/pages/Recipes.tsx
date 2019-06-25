import React, { Component } from 'react';
import { withAppContext, IAppContext } from '../components/AppContext';

import '../style/Recipes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Recipe } from '../api/recipe';
import RecipeListItem from '../components/RecipeListItem';
import Ripples from 'react-ripples';
import { RouteComponentProps } from 'react-router';

interface IRecipesState {
	recipes: Recipe[];
}

interface IRecipesProps extends RouteComponentProps{
	appContext: IAppContext;
}

class RecipesPage extends Component<IRecipesProps> {
	public state: IRecipesState = {
		recipes: []
	};

	constructor(props: any) {
		super(props);
		this.listItemClick = this.listItemClick.bind(this);
		this.newRecipeButtonClick = this.newRecipeButtonClick.bind(this);
	}

	componentDidMount() {
		this._fetchRecipes();
	}

	private _fetchRecipes() {
		fetch('http://localhost:8080/api/collection/recipes').then((response: Response) => {
			return response.json();
		}).then((json: any) => {
			let recipes: Recipe[] = [];
			if (json && Array.isArray(json)) {
				recipes = json.map((recipe: any) => {
					return new Recipe(recipe);
				});
			}
			this.props.appContext.setHeader('Recipes');
			this.setState({recipes: recipes});
		});
	}

	listItemClick(evt: React.MouseEvent) {
		const dataId = evt.currentTarget.getAttribute('data-id');
		setTimeout(() => {
			this.props.history.push('/recipes/' + dataId);
		}, 300);
	}

	newRecipeButtonClick(evt: React.MouseEvent) {
		setTimeout(() => {
			this.props.history.push('/recipes/new');
		}, 300);
	}

	render() {
		const {recipes} = this.state;
		return (
			<React.Fragment>
				<div className="pageActionContainer horizontal flex-end">
					<div className="pageActionButtonContainer">
						<Ripples>
							<button
								title="New Recipe"
								className="newRecipeButton"
								onClick={this.newRecipeButtonClick}>
								<FontAwesomeIcon
									className="newRecipeButtonIcon fa-fw"
									icon={faPlus}
								/>
							</button>
						</Ripples>
					</div>
				</div>
				{recipes.map((item) => (
					<RecipeListItem
						recipe={item}
						key={item.id}
						onClick={this.listItemClick}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default withAppContext(RecipesPage);
