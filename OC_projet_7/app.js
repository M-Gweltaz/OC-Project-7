// MODEL
import { Recipe } from './models/Recipe.js';
import { Tag } from './models/Tag.js';
// MODULES
import {
	tagHandling,
	checkTagName,
	tagSearchMenuHandling,
} from './modules/tagHandling.js';
import { queryHandling, searchQuery } from './modules/queryHandling.js';
// DATA
import { recipes } from './modules/data.js';

// Initialising RecipeList
let recipeList = [];

// Initialising tagLists
let ingredientsTagList = [];
let appliancesTagList = [];
let ustensilsTagList = [];

// Initialising tagLists STATE
const ingredientsTagListSTATE = {
	currentState: [],
	setState(newState) {
		ingredientsTagListSTATE.currentState = newState;
	},
};
const appliancesTagListSTATE = {
	currentState: [],
	setState(newState) {
		appliancesTagListSTATE.currentState = newState;
	},
};
const ustensilsTagListSTATE = {
	currentState: [],
	setState(newState) {
		ustensilsTagListSTATE.currentState = newState;
	},
};

// DATA hydration
for (let recipe of recipes) {
	recipe = new Recipe(
		recipe.id,
		recipe.name,
		recipe.servings,
		recipe.ingredients,
		recipe.time,
		recipe.description,
		recipe.appliance,
		recipe.ustensils
	);

	// creating a new array of Recipe
	recipeList.push(recipe);

	// creating all the recipeCard
	recipe.createNewRecipeCard(
		recipe.name,
		recipe.ingredients,
		recipe.time,
		recipe.description
	);
	// geting all the tagList elements AND setting their states
	recipe.getIngredientsTagList(
		recipe.id,
		recipe.ingredients,
		ingredientsTagList
	);
	ingredientsTagListSTATE.currentState = ingredientsTagList;

	recipe.getApplianceTagList(recipe.id, recipe.appliance, appliancesTagList);
	appliancesTagListSTATE.currentState = appliancesTagList;

	recipe.getUstensilsTagList(recipe.id, recipe.ustensils, ustensilsTagList);
	ustensilsTagListSTATE.currentState = ustensilsTagList;
}

export {
	recipeList,
	ingredientsTagList,
	ingredientsTagListSTATE,
	appliancesTagList,
	appliancesTagListSTATE,
	ustensilsTagList,
	ustensilsTagListSTATE,
};

export const creatingTagList = (elementTagList, element, elementDOM) => {
	// DOM ELEM
	const ingredientsSearchBarInput = document.querySelector(
		'#ingredientsSearchBarInput'
	);
	const appliancesSearchBarInput = document.querySelector(
		'#appliancesSearchBarInput'
	);
	const ustensilsSearchBarInput = document.querySelector(
		'#ustensilsSearchBarInput'
	);
	// adding each element in their respective lists
	for (const elementTag of elementTagList) {
		let content = document.createElement('li');

		// creating new selected tag
		content.addEventListener('click', (e) => {
			if (checkTagName(e.target.textContent, elementTagList, `${element}`)) {
				const newTag = new Tag(e.target.textContent, `${element}sColor`);
				newTag.createNewTag(e.target.textContent, `${element}sColor`);
				// start the query
				searchQuery();
			} else {
				switch (true) {
					case element == 'ingredient':
						setTimeout(() => {
							ingredientsSearchBarInput.classList.add('wrongInput');
						}, 0);
						setTimeout(() => {
							ingredientsSearchBarInput.classList.remove('wrongInput');
						}, 3000);
						break;
					case element == 'appliance':
						setTimeout(() => {
							appliancesSearchBarInput.classList.add('wrongInput');
						}, 0);
						setTimeout(() => {
							appliancesSearchBarInput.classList.remove('wrongInput');
						}, 3000);
						break;
					case element == 'ustensil':
						setTimeout(() => {
							ustensilsSearchBarInput.classList.add('wrongInput');
						}, 0);
						setTimeout(() => {
							ustensilsSearchBarInput.classList.remove('wrongInput');
						}, 3000);
						break;
				}
			}
		});
		content.textContent = `${elementTag[element]}`;
		elementDOM.append(content);
	}
};

// creating all the tags lists
const hydratingTagList = () => {
	// DOM ELEM
	const ingredientListDOM = document.querySelector('#ingredientTagList');
	const applianceListDOM = document.querySelector('#applianceTagList');
	const ustensilListDOM = document.querySelector('#ustensilTagList');

	creatingTagList(
		ingredientsTagListSTATE.currentState,
		'ingredient',
		ingredientListDOM
	);
	creatingTagList(
		appliancesTagListSTATE.currentState,
		'appliance',
		applianceListDOM
	);
	creatingTagList(
		ustensilsTagListSTATE.currentState,
		'ustensil',
		ustensilListDOM
	);
};
hydratingTagList();

// Handling the openning and closing of the tagsSearchBars
tagSearchMenuHandling();

// Handling the adding/deleting tag process
tagHandling();

// Handling the query
queryHandling();
