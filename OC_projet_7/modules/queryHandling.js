import { Recipe } from '../models/Recipe.js';
import {
	recipeList,
	ingredientsTagList,
	appliancesTagList,
	ustensilsTagList,
} from '../app.js';

// Array of the found recipes query
let queryResultArray = [];

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

		// // getting all the tag selected
		// let tagList = searchingQueryTagDOM.children;

		// stocking each selected tag within specific tag array
		let ingredientSelectedTag = [];
		let applianceSelectedTag = [];
		let ustensilSelectedTag = [];

		// sorting them with their className
		tagList.forEach((tag) => {
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
		});

		// selected tag ingredient query
		let tempTagIngredientResult = [];
		ingredientsTagList.some((ingredientItem) => {
			ingredientSelectedTag.forEach((selectedTag) => {
				if (selectedTag == ingredientItem.ingredient) {
					ingredientItem.id.forEach((id) => {
						tempTagIngredientResult.push(
							queryResultArray.find((recipe) => recipe.id == id)
						);
					});
				}
			});
		});
		console.log(tempTagIngredientResult);

		// selected tag appliance query
		let tempTagApplianceResult = [];
		appliancesTagList.some((applianceItem) => {
			applianceSelectedTag.forEach((selectedTag) => {
				if (selectedTag == applianceItem.appliance) {
					applianceItem.id.forEach((id) => {
						tempTagApplianceResult.push(
							queryResultArray.find((recipe) => recipe.id == id)
						);
					});
				}
			});
		});
		console.log(tempTagApplianceResult);

		// selected tag ustensil query
		let tempTagUstensilResult = [];
		ustensilsTagList.some((ustensilItem) => {
			ustensilSelectedTag.forEach((selectedTag) => {
				if (selectedTag == ustensilItem.ustensil) {
					ustensilItem.id.forEach((id) => {
						tempTagUstensilResult.push(
							queryResultArray.find((recipe) => recipe.id == id)
						);
					});
				}
			});
		});
		console.log(tempTagUstensilResult);

		// deleting last tag result
		let tagResultIntersection = [];

		// checking wich result macth to get the final result
		// all tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length > 0
		) {
			tagResultIntersection = tempTagIngredientResult.filter(
				(recipe) =>
					tempTagApplianceResult.includes(recipe) &&
					tempTagUstensilResult.includes(recipe)
			);
		}

		//ingredient and appliance tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length == 0
		) {
			tagResultIntersection = tempTagIngredientResult.filter((recipe) =>
				tempTagApplianceResult.includes(recipe)
			);
		}

		//ingredient and ustensil tag used
		if (
			tempTagIngredientResult.length > 0 &&
			tempTagApplianceResult.length == 0 &&
			tempTagUstensilResult.length > 0
		) {
			tagResultIntersection = tempTagIngredientResult.filter((recipe) =>
				tempTagUstensilResult.includes(recipe)
			);
		}

		//appliance and ustensil tag used
		if (
			tempTagIngredientResult.length == 0 &&
			tempTagApplianceResult.length > 0 &&
			tempTagUstensilResult.length > 0
		) {
			tagResultIntersection = tempTagApplianceResult.filter((recipe) =>
				tempTagUstensilResult.includes(recipe)
			);
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
		console.log('tag result =>', tagResultIntersection);

		return tagResultIntersection;
	};

	// Global query logic
	const mainSearchBarQuery = (e) => {
		// handling tag logic
		// getting all the tag selected
		let [...tagList] = searchingQueryTagDOM.children;

		// if tag used changing the scope of the search
		tagList.length == 0
			? (queryResultArray = recipeList)
			: (queryResultArray = selectedTagHandling(tagList));

		// name searchBar query
		let tempNameResult = queryResultArray.filter((queryResult) =>
			queryResult.name.toLowerCase().match(e.target.value.toLowerCase())
		);
		console.log('name result =>', tempNameResult);

		// ingredient searchBar query
		let tempIngredientResult = [];
		ingredientsTagList.forEach((queryResult) => {
			if (
				queryResult.ingredient.toLowerCase().match(e.target.value.toLowerCase())
			) {
				queryResult.id.forEach((id) => {
					// storing only the found recipes not the undefined one
					if (queryResultArray.find((recipe) => recipe.id == id) != undefined)
						tempIngredientResult.push(
							queryResultArray.find((recipe) => recipe.id == id)
						);
				});
			}
		});
		console.log('ingredient result =>', tempIngredientResult);

		// description search query
		let tempDescriptionResult = queryResultArray.filter((queryResult) =>
			queryResult.description.toLowerCase().match(e.target.value.toLowerCase())
		);
		console.log('description result =>', tempDescriptionResult);

		// Final searchBar result by grouping each tempResult
		let finalSearchBarResult = new Set([
			...tempNameResult,
			...tempIngredientResult,
			...tempDescriptionResult,
		]);

		console.log(finalSearchBarResult);

		// deleting last DOM result
		searchResultDOM.innerHTML = '';

		// creating all the DOM recipeCard
		finalSearchBarResult.forEach((recipe) => {
			recipe.createNewRecipeCard(
				recipe.name,
				recipe.ingredients,
				recipe.time,
				recipe.description
			);
		});
	};

	searchingQueryDOM.addEventListener('change', mainSearchBarQuery);
};
