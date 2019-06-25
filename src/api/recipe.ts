import {Ingredient} from './ingredient';

export class Recipe {
	private _apiObj: any = {};
	private _description: string = '';
	private _id: string = '';
	private _ingredients: any[] = [];
	private _instructions: string = '';
	private _reference: string = '';
	private _title: string = '';

	constructor(apiObj?: any) {
		this._apiObj = apiObj;
	}

	get description() {
		if (!this._description && this._apiObj) {
			this._description = this._apiObj.description;
		}
		return this._description;
	}

	set description(description: string) {
		this._description = description;
	}

	get id() {
		if (!this._id && this._apiObj) {
			this._id = this._apiObj._id;
		}
		return this._id;
	}

	get ingredients() {
		if ((!this._ingredients || this._ingredients.length === 0) && this._apiObj) {
			if (this._apiObj.ingredients && this._apiObj.ingredients.length > 0) {
				this._ingredients = this._apiObj.ingredients.map((ingrediant: any) => {
					return new Ingredient(ingrediant);
				});
			}
		}
		return this._ingredients || [];
	}

	set ingredients(ingredients: Ingredient[]) {
		this._ingredients = ingredients;
	}

	get instructions() {
		if (!this._instructions && this._apiObj) {
			this._instructions = this._apiObj.instructions;
		}
		return this._instructions;
	}

	set instructions(instructions: string) {
		this._instructions = instructions;
	}

	get reference() {
		if (!this._reference && this._apiObj) {
			this._reference = this._apiObj.reference;
		}
		return this._reference;
	}

	set reference(reference: string) {
		this._reference = reference;
	}

	get title() {
		if (!this._title && this._apiObj) {
			this._title = this._apiObj.title;
		}else if (!this._title && !this._apiObj) {
			this._title = 'New Recipe';
		}
		return this._title;
	}

	set title(title: string) {
		this._title = title;
	}
	/**
	 * Return only the public values with the exception of _id. This is used
	 * for JSON.stringify automatically
	 */
	toJSON() {
		const proto = Object.getPrototypeOf(this);
		const jsonObj: any = {};// Object.assign({}, this) as any;
		Object.entries(Object.getOwnPropertyDescriptors(proto))
			.filter(([key, descriptor]) => typeof descriptor.get === 'function')
			.map(([key, descriptor]) => {
				if (descriptor && key[0] !== '_' && key !== 'id') {
					try {
						const val = (this as any)[key];
						jsonObj[key] = val;
					}catch (e) {
						console.error(`Error calling getter ${key}`, e);
					}
				}
			});
		return jsonObj;
	}
}
