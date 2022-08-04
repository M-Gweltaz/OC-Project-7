// MODEL
import { Recipe } from './models/Recipe.js';
// MODULES
import tagHandling from './modules/tagHandling.js';
import tagSearchMenuHandling from './modules/tagSearchMenu.js';
// DATA
import { recipes } from './modules/data.js';

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

	recipe.createNewRecipeCard(
		recipe.name,
		recipe.ingredients,
		recipe.time,
		recipe.description
	);
});

// Handling the openning and closing of the tagsSearchBars
tagSearchMenuHandling();

// Handling the adding/deleting tag process
tagHandling();
