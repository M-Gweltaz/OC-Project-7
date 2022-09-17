import { Tag } from '../models/Tag.js';
import {
	ingredientsTagList,
	appliancesTagList,
	ustensilsTagList,
} from '../app.js';

// Handling the adding/deleting tag process
export const tagHandling = () => {
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

	// DOM LISTENER for adding new tag
	ingredientsSearchBarInput.addEventListener('keydown', (e) => {
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, ingredientsTagList, 'ingredient'):
				const newTag = new Tag(e.target.value, 'ingredientsColor');
				newTag.createNewTag(e.target.value, 'ingredientsColor');
				break;

			case e.key == 'Enter' && e.keyCode == 13:
				setTimeout(() => {
					ingredientsSearchBarInput.classList.add('wrongInput');
				}, 0);
				setTimeout(() => {
					ingredientsSearchBarInput.classList.remove('wrongInput');
				}, 500);
				break;
		}
	});

	appliancesSearchBarInput.addEventListener('keydown', (e) => {
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, appliancesTagList, 'appliance'):
				const newTag = new Tag(e.target.value, 'appliancesColor');
				newTag.createNewTag(e.target.value, 'appliancesColor');
				break;

			case e.key == 'Enter' && e.keyCode == 13:
				setTimeout(() => {
					appliancesSearchBarInput.classList.add('wrongInput');
				}, 0);
				setTimeout(() => {
					appliancesSearchBarInput.classList.remove('wrongInput');
				}, 3000);
				break;
		}
	});

	ustensilsSearchBarInput.addEventListener('keydown', (e) => {
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, ustensilsTagList, 'ustensil'):
				const newTag = new Tag(e.target.value, 'ustensilsColor');
				newTag.createNewTag(e.target.value, 'ustensilsColor');
				break;

			case e.key == 'Enter' && e.keyCode == 13:
				setTimeout(() => {
					ustensilsSearchBarInput.classList.add('wrongInput');
				}, 0);
				setTimeout(() => {
					ustensilsSearchBarInput.classList.remove('wrongInput');
				}, 3000);
				break;
		}
	});
};

// Checking if tag exist in the given tagList
const checkTagName = (writenTag, tagList, item) => {
	let isFound = false;
	for (const tag of tagList) {
		if (tag[item].toLowerCase() === writenTag.toLowerCase()) {
			isFound = true;
		}
	}
	return isFound;
};

// Handling the openning and closing of the tagsSearchBars
export const tagSearchMenuHandling = () => {
	const ingredientsSearchBarMenu = document.querySelector(
		'#ingredientsSearchBarMenu'
	);
	const appliancesSearchbarMenu = document.querySelector(
		'#appliancesSearchBarMenu'
	);
	const ustensilsSearchBarMenu = document.querySelector(
		'#ustensilsSearchBarMenu'
	);

	const tagSearchBarOpenClose = (searchBarOpened, backgroundColor) => {
		let parentElem = searchBarOpened.parentElement;
		parentElem.classList.toggle('tagSearchBarOpen');
		parentElem.classList.toggle(`${backgroundColor}`);
		parentElem.children[1].classList.toggle('inputSvgOpen');
		parentElem.children[2].classList.toggle('tagSearchBarClose');
		parentElem.children[2].classList.toggle('tagSearchBarOpen');
	};

	ingredientsSearchBarMenu.addEventListener('click', () => {
		tagSearchBarOpenClose(ingredientsSearchBarMenu, 'ingredientsColor');
	});

	appliancesSearchbarMenu.addEventListener('click', () => {
		tagSearchBarOpenClose(appliancesSearchbarMenu, 'appliancesColor');
	});

	ustensilsSearchBarMenu.addEventListener('click', () => {
		tagSearchBarOpenClose(ustensilsSearchBarMenu, 'ustensilsColor');
	});
};
