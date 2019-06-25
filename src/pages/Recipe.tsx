import React, { Component } from 'react';
import { withAppContext, IAppContext } from '../components/AppContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Recipe } from '../api/recipe';
import '../style/Recipe.css';
import RecipeIngredients from '../components/RecipeIngredients';
import { RouteComponentProps } from 'react-router';
import Ripples from 'react-ripples';
import { Ingredient } from '../api/ingredient';

interface IRecipePageState {
	recipe: Recipe;
	isNew: boolean;
	isDirty: boolean;
}

interface IRecipePageProps extends RouteComponentProps {
	appContext: IAppContext;
}

class RecipePage extends Component<IRecipePageProps> {
	private _origRecipe: Recipe|undefined;

	public state: IRecipePageState = {
		recipe: new Recipe(),
		isNew: false,
		isDirty: false
	};

	constructor(props: any) {
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
		this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
		this.onNewIngredientClick = this.onNewIngredientClick.bind(this);
	}

	componentDidMount() {
		const params = this.props.match.params as any;
		const recipeId = params.recipeId;
		if (recipeId !== 'new') {
			this.setState({isNew: false});
			this._fetchRecipe(recipeId);
		}else {
			this.setState({isNew: true});
		}
	}

	private _fetchRecipe(recipeId: string) {
		if (!this.state.isNew) {
			fetch('http://localhost:8080/api/collection/recipes/' + recipeId).then((response: Response) => {
				return response.json();
			}).then((json: any) => {
				if (json) {
					const recipe = new Recipe(json);
					this.props.appContext.setHeader('Recipe : ' + recipe.title);
					this.setState({recipe: recipe});
				}
			});
		}
	}

	onChangeHandler(evt: any) {
		if (!this._origRecipe) {
			this._origRecipe = Object.assign({}, this.state.recipe);
		}
		const fieldName = evt.currentTarget.name;
		const fieldValue = evt.currentTarget.value;
		const recipe = this.state.recipe as any;
		recipe[fieldName] = fieldValue;
		const isDiff = this._isRecipeDiffOrig(this._origRecipe, recipe);
		this.setState({recipe: recipe, isDirty: true});
	}

	private _isRecipeDiffOrig(origRecipe: Recipe, changedRecipe: Recipe) {
		return true;
	}

	onSaveButtonClick(evt: React.MouseEvent) {
		const formData = JSON.stringify(this.state.recipe);
		if (formData) {
			const method = this.state.isNew ? 'POST' : 'PUT'
			const urlPart = 'http://localhost:8080/api/collection/recipes';
			const url = this.state.isNew ? urlPart : urlPart + '/' + this.state.recipe.id;
			fetch(url, {
				method: method,
				headers: new Headers({
					'content-type': 'application/json'
				}),
				body: formData
			}).then((response: Response) => {
				return response.json();
			}).then((json: any) => {
				if (method === 'PUT') {
					this.setState({recipe: new Recipe(json)});
				}else {
					const newRoutePath = '/recipes/' + [json['_id']];
					this.props.history.push(newRoutePath);
					this.setState({recipe: new Recipe(json)});
				}
			}).catch((err: Error) => {
				console.error('An error occurred during update: ', err.message);
			});
		}
	}

	onCloseButtonClick(evt: React.MouseEvent) {
		setTimeout(() => {
			this.props.history.push('/recipes');
		}, 300);
	}

	onNewIngredientClick(evt: React.MouseEvent) {
		const ingredient = new Ingredient();
		ingredient.id = new Date().getTime();
		const newStateRecipe = this.state.recipe;
		newStateRecipe.ingredients.push(ingredient);
		this.setState({recipe: newStateRecipe});
	}

	render() {
		const {recipe, isDirty} = this.state;
		const buttonContainerClass = isDirty ? 'formActionButtonContainer' : 'formActionButtonContainer disabled';
		return (
			<div className="recipePage">
				<div className="recipeHeaderContainer horizontal flex-end">
					<div className="recipeHeader vertical">
						<h3>{recipe.title}</h3>
						<span className="smallText">id: {recipe.id}</span>
					</div>
					<div className="pageActionButtonContainer">
						<Ripples>
							<button
								title="Close Document"
								className="closeButton"
								onClick={this.onCloseButtonClick}>
								<FontAwesomeIcon
									className="closeButtonIcon fa-fw"
									icon={faTimes}
								/>
							</button>
						</Ripples>
					</div>
				</div>
				<div className="formContainer">
					<div className="formRow">
						<label>Title</label>
						<input
							type="text"
							name="title"
							onChange={this.onChangeHandler}
							value={recipe.title}>
						</input>
					</div>
					<div className="formRow">
						<label>Reference URL</label>
						<input
							type="url"
							name="reference"
							onChange={this.onChangeHandler}
							value={recipe.reference}>
						</input>
					</div>
					<div className="formRow">
						<label>Description</label>
						<textarea
							name="description"
							rows={3}
							onChange={this.onChangeHandler}
							value={recipe.description}>
						</textarea>
					</div>
					<div className="ingredientsContainer">
						<h3>Ingredients</h3>
						<div className="formActionBarContainer horizontal flex-end">
							<div className="pageActionButtonContainer">
								<Ripples>
									<button
										type="button"
										title="New Ingredient"
										onClick={this.onNewIngredientClick}>
										<FontAwesomeIcon
											icon={faPlus}
											className="newButtonIcon fa-fw"
										/>
									</button>
								</Ripples>
							</div>
						</div>
						<RecipeIngredients ingredients={recipe.ingredients} />
					</div>
					<div className="formRow">
						<label>Instructions</label>
						<textarea
							name="instructions"
							rows={10}
							onChange={this.onChangeHandler}
							value={recipe.instructions}>
						</textarea>
					</div>
				</div>
				<div className="formActionContainer horizontal flex-end">
					<div className={buttonContainerClass}>
						<Ripples>
							<button
								type="button"
								onClick={this.onSaveButtonClick}
								disabled={!isDirty}>
								Save
							</button>
						</Ripples>
					</div>
				</div>
			</div>
		);
	}
}

export default withAppContext(RecipePage);
