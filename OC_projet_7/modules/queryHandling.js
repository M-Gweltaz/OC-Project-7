import { Recipe } from '../models/Recipe.js';
import { updatedTagMenu } from './tagHandling.js';
import {
	recipeList,
	ingredientsTagList,
	appliancesTagList,
	ustensilsTagList,
} from '../app.js';

// Array of the found recipes query
let queryResultArray = [];

// exporting search functionn and result
export let searchQuery;
export let finalSearchBarResult;

// includes logic using plain old loops
const arrayInclude = (array, element) => {
	let result = false;
	for (const item of array) {
		if (item == element) {
			result = true;
		}
	}
	return result;
};

// find logic using plain old loops
const arrayFindById = (array, element) => {
	let result = undefined;
	for (const item of array) {
		if (item.id == element) {
			result = item;
		}
	}
	return result;
};

export const queryHandling = () => {
	// DOM selectors
	const searchResultDOM = document.querySelector('.searchResults');
	const searchingQueryDOM = document.querySelector('.searchBar__input');
	const searchingQueryTagDOM = document.querySelector(
		'.searchBarModifier__tagSelected'
	);

	// Initializing the query result with the received recipe Array
	let queryResultArray = recipeList;

	// narrowing through selected tag the recipe array
	const selectedTagHandling = (tagList) => {
		// reseting the queryResultArray with full array
		let queryResultArray = recipeList;

		// stocking each selected tag within specific tag array
		let ingredientSelectedTag = [];
		let applianceSelectedTag = [];
		let ustensilSelectedTag = [];

		// sorting them with their className
		for (const tag of tagList) {
			switch (true) {
				case tag.className == 'ingredientsColor':
					ingredientSelectedTag.push(tag.textContent.slice(0, -1));
					break;
				case tag.className == 'appliancesColor':
					applianceSelectedTag.push(tag.textContent.slice(0, -1));
					break;
				case tag.className == 'ustensilsColor':
					ustensilSelectedTag.push(tag.textContent.slice(0, -1));
					break;
			}
		}

		// selected tag ingredient query
		let tempTagIngredientResult = [];
		for (const ingredientItem of ingredientsTagList) {
			for (const selectedTag of ingredientSelectedTag) {
				if (
					selectedTag.toLowerCase() == ingredientItem.ingredient.toLowerCase()
				) {
					switch (true) {
						// only one ingredient tag used
						case tempTagIngredientResult.length == 0:
							for (const id of ingredientItem.id) {
								tempTagIngredientResult.push(
									arrayFindById(queryResultArray, id)
								);
							}
							break;

						// multiple tag intersection needed
						default:
							let currentTagResults = [];
							for (const id of ingredientItem.id) {
								currentTagResults.push(arrayFindById(queryResultArray, id));
							}

							// sorting only the recipes that match all tags
							let intersection = tempTagIngredientResult.filter((recipe) =>
								arrayInclude(currentTagResults, recipe)
							);
							tempTagIngredientResult = intersection;
					}
				}
			}
		}
		console.log('INGREDIENT TAG =>', tempTagIngredientResult);

		// selected tag appliance query
		let tempTagApplianceResult = [];
		for (const applianceItem of appliancesTagList) {
			for (const selectedTag of applianceSelectedTag) {
				if (
					selectedTag.toLowerCase() == applianceItem.appliance.toLowerCase()
				) {
					switch (true) {
						// only one ingredient tag used
						case tempTagApplianceResult.length == 0:
							for (const id of applianceItem.id) {
								tempTagApplianceResult.push(
									arrayFindById(queryResultArray, id)
								);
							}
							break;

						// multiple tag intersection needed
						default:
							let currentTagResults = [];
							for (const id of applianceItem.id) {
								currentTagResults.push(arrayFindById(queryResultArray, id));
							}

							// sorting only the recipes that match all tags
							let intersection = tempTagApplianceResult.filter((recipe) =>
								currentTagResults.includes(recipe)
							);
							tempTagApplianceResult = intersection;
					}
				}
			}
		}
		console.log('APPLIANCE TAG =>', tempTagApplianceResult);

		// selected tag ustensil query
		let tempTagUstensilResult = [];
		for (const ustensilItem of ustensilsTagList) {
			for (const selectedTag of ustensilSelectedTag) {
				if (selectedTag == ustensilItem.ustensil) {
					for (const id of ustensilItem.id) {
						tempTagUstensilResult.push(
							arrayFindById(queryResultArray, id)
							// queryResultArray.find((recipe) => recipe.id == id)
						);
					}
				}
				if (selectedTag.toLowerCase() == ustensilItem.ustensil.toLowerCase()) {
					switch (true) {
						case tempTagUstensilResult.length == 0:
							for (const id of ustensilItem.id) {
								tempTagUstensilResult.push(arrayFindById(queryResultArray, id));
							}
							break;

						// multiple tag intersection needed
						default:
							let currentTagResults = [];
							for (const id of ustensilItem.id) {
								currentTagResults.push(arrayFindById(queryResultArray, id));
							}

							// sorting only the recipes that match all tags
							let intersection = tempTagUstensilResult.filter((recipe) =>
								currentTagResults.includes(recipe)
							);
							tempTagUstensilResult = intersection;

						// FILTER CHANGE
						// let tempNameResult = [];
						// for (const queryResult of queryResultArray) {
						// 	if (queryResult.name.toLowerCase().match(mainSearchBarInput.toLowerCase())) {
						// 		tempNameResult.push(queryResult);
						// 	}
						// }
					}
				}
			}
		}
		console.log('USTENSIL TAG =>', tempTagUstensilResult);

		// deleting last tag result
		let tagResultIntersection = [];

		// checking wich result macth to get the final result
		// all tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length > 0
		) {
			for (const recipe of tempTagIngredientResult) {
				if (
					arrayInclude(tempTagIngredientResult, recipe) &&
					arrayInclude(tempTagApplianceResult, recipe) &&
					arrayInclude(tempTagUstensilResult, recipe)
				) {
					tagResultIntersection.push(recipe);
				}
			}
		}

		//ingredient and appliance tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length == 0
		) {
			for (const recipe of tempTagIngredientResult) {
				if (
					arrayInclude(tempTagIngredientResult, recipe) &&
					arrayInclude(tempTagApplianceResult, recipe)
				) {
					tagResultIntersection.push(recipe);
				}
			}
		}

		//ingredient and ustensil tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length == 0 &&
			tempTagUstensilResult.length > 0
		) {
			for (const recipe of tempTagIngredientResult) {
				if (
					arrayInclude(tempTagIngredientResult, recipe) &&
					arrayInclude(tempTagUstensilResult, recipe)
				) {
					tagResultIntersection.push(recipe);
				}
			}
		}

		//appliance and ustensil tag used
		if (
			tempTagIngredientResult.length == 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length > 0
		) {
			for (const recipe of tempTagApplianceResult) {
				if (
					arrayInclude(tempTagApplianceResult, recipe) &&
					arrayInclude(tempTagUstensilResult, recipe)
				) {
					tagResultIntersection.push(recipe);
				}
			}
		}

		// only one tag used so doesn't need to search the intersection anymore
		if (
			(tempTagIngredientResult.length > 0 &&
				tempTagApplianceResult.length == 0 &&
				tempTagUstensilResult.length == 0) ||
			(tempTagIngredientResult.length == 0 &&
				tempTagApplianceResult.length > 0 &&
				tempTagUstensilResult.length == 0) ||
			(tempTagIngredientResult.length == 0 &&
				tempTagApplianceResult.length == 0 &&
				tempTagUstensilResult.length > 0)
		) {
			// grouping the tempResult
			tagResultIntersection = new Set([
				...tempTagIngredientResult,
				...tempTagApplianceResult,
				...tempTagUstensilResult,
			]);
		}

		// transforming the set as an Array
		tagResultIntersection = [...tagResultIntersection];
		console.log('TAG RESULT =>', tagResultIntersection);

		return tagResultIntersection;
	};

	// Global query logic
	searchQuery = () => {
		// getting the value of the mainBarSearch
		const mainSearchBarInput = searchingQueryDOM.value;
		console.log(queryResultArray);

		// handling tag logic
		// getting all the tag selected
		let [...tagList] = searchingQueryTagDOM.children;

		// if tag used changing the scope of the search
		tagList.length == 0
			? (queryResultArray = recipeList)
			: (queryResultArray = selectedTagHandling(tagList));

		console.log('SCOPE =>', queryResultArray);

		// only firing if 3 chars min are used for the query
		if (mainSearchBarInput.length >= 3) {
			// name searchBar query
			let tempNameResult = [];
			for (const queryResult of queryResultArray) {
				if (
					queryResult.name.toLowerCase().match(mainSearchBarInput.toLowerCase())
				) {
					tempNameResult.push(queryResult);
				}
			}
			console.log('name result =>', tempNameResult);

			// ingredient searchBar query
			let tempIngredientResult = [];
			for (const queryResult of ingredientsTagList) {
				if (
					queryResult.ingredient
						.toLowerCase()
						.match(mainSearchBarInput.toLowerCase())
				) {
					for (const id of queryResult.id) {
						// storing only the found recipes not the undefined one
						if (arrayFindById(queryResultArray, id) != undefined) {
							tempIngredientResult.push(arrayFindById(queryResultArray, id));
						}
					}
				}
			}
			console.log('ingredient result =>', tempIngredientResult);

			// description search query
			let tempDescriptionResult = [];
			for (const queryResult of queryResultArray) {
				if (
					queryResult.description
						.toLowerCase()
						.match(mainSearchBarInput.toLowerCase())
				) {
					tempDescriptionResult.push(queryResult);
				}
			}
			console.log('description result =>', tempDescriptionResult);

			// Final searchBar result by grouping each tempResult
			finalSearchBarResult = new Set([
				...tempNameResult,
				...tempIngredientResult,
				...tempDescriptionResult,
			]);

			// deleting last DOM result
			searchResultDOM.innerHTML = '';

			// creating all the DOM recipeCard
			for (const recipe of finalSearchBarResult) {
				recipe.createNewRecipeCard(
					recipe.name,
					recipe.ingredients,
					recipe.time,
					recipe.description
				);

				// Updating the taglist menu with current search result
				updatedTagMenu(finalSearchBarResult);
			}
		} else {
			// deleting last DOM result
			searchResultDOM.innerHTML = '';

			finalSearchBarResult = queryResultArray;

			// creating all the DOM recipeCard
			finalSearchBarResult.forEach((recipe) => {
				recipe.createNewRecipeCard(
					recipe.name,
					recipe.ingredients,
					recipe.time,
					recipe.description
				);

				// Updating the taglist menu with current search result
				updatedTagMenu(finalSearchBarResult);
			});
		}

		// Sending a message if no result found
		if (finalSearchBarResult.size === 0) {
			const searchResultList = document.querySelector('.searchResults');
			searchResultList.innerHTML =
				'<h3 class="searchResults__noResult">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...';
		}
	};

	searchingQueryDOM.addEventListener('input', searchQuery);
};
