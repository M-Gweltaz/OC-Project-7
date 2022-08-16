// MODEL
import { Recipe } from './models/Recipe.js';
import { Tag } from './models/Tag.js';

// MODULES
import { tagHandling, tagSearchMenuHandling } from './modules/tagHandling.js';
// DATA
import { recipes } from './modules/data.js';

// Initialising tagLists
let ingredientsTagList = [];
let appliancesTagList = [];
let ustensilsTagList = [];

// DATA hydration
recipes.map((recipe) => {
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

	// creating all the recipeCard
	recipe.createNewRecipeCard(
		recipe.name,
		recipe.ingredients,
		recipe.time,
		recipe.description
	);

	// geting all the tagList elements
	recipe.getIngredientsTagList(
		recipe.id,
		recipe.ingredients,
		ingredientsTagList
	);
	recipe.getApplianceTagList(recipe.id, recipe.appliance, appliancesTagList);
	recipe.getUstensilsTagList(recipe.id, recipe.ustensils, ustensilsTagList);
});

export { ingredientsTagList, appliancesTagList, ustensilsTagList };
console.log(ingredientsTagList);
// creating all the tags lists
const hydratingTagList = () => {
	// DOM ELEM
	const ingredientListDOM = document.querySelector('#ingredientTagList');
	const applianceListDOM = document.querySelector('#applianceTagList');
	const ustensilListDOM = document.querySelector('#ustensilTagList');

	const creatingTagList = (elementTagList, element, elementDOM) => {
		// adding each element in their respective lists
		elementTagList.forEach((elementTag) => {
			let content = document.createElement('li');

			// creating new selected tag
			content.addEventListener('click', (e) => {
				const newTag = new Tag(e.target.textContent, `${element}sColor`);
				newTag.createNewTag(e.target.textContent, `${element}sColor`);
			});
			content.textContent = `${elementTag[element]}`;
			elementDOM.append(content);
		});
	};

	creatingTagList(ingredientsTagList, 'ingredient', ingredientListDOM);
	creatingTagList(appliancesTagList, 'appliance', applianceListDOM);
	creatingTagList(ustensilsTagList, 'ustensil', ustensilListDOM);
};
hydratingTagList();

// Handling the openning and closing of the tagsSearchBars
tagSearchMenuHandling();

// Handling the adding/deleting tag process
tagHandling();
