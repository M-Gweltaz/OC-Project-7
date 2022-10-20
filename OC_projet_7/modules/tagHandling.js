import { Tag } from '../models/Tag.js';
import {
	queryHandling,
	searchQuery,
	finalSearchBarResult,
} from './queryHandling.js';
import {
	ingredientsTagList,
	appliancesTagList,
	ustensilsTagList,
	creatingTagList,
} from '../app.js';

const ingredientListDOM = document.querySelector('#ingredientTagList');
const applianceListDOM = document.querySelector('#applianceTagList');
const ustensilListDOM = document.querySelector('#ustensilTagList');

export const updatedTagMenu = (searchResult) => {
	// reseting previous menus
	ingredientListDOM.innerHTML = '';
	applianceListDOM.innerHTML = '';
	ustensilListDOM.innerHTML = '';

	// updating the tag menus
	let ingredientUpdatedTagMenu = () => {
		let updatedIngredientTagList = [];
		for (const ingredientTag of ingredientsTagList) {
			for (const id of ingredientTag.id) {
				for (const recipe of searchResult) {
					if (recipe.id == id) {
						updatedIngredientTagList.push(ingredientTag);
					}
				}
			}
		}
		// preventing multiple same occurence
		let cleandUpdatedIngredientTagList = new Set([...updatedIngredientTagList]);
		creatingTagList(
			cleandUpdatedIngredientTagList,
			'ingredient',
			ingredientListDOM
		);
	};
	ingredientUpdatedTagMenu();

	let applianceUpdatedTagMenu = () => {
		let updatedApplianceTagList = [];
		for (const applianceTag of appliancesTagList) {
			for (const id of applianceTag.id) {
				for (const recipe of searchResult) {
					if (recipe.id == id) {
						updatedApplianceTagList.push(applianceTag);
					}
				}
			}
		}
		// preventing multiple same occurence
		let cleanUpdatedApplianceTagList = new Set([...updatedApplianceTagList]);
		creatingTagList(
			cleanUpdatedApplianceTagList,
			'appliance',
			applianceListDOM
		);
	};
	applianceUpdatedTagMenu();

	let ustensilUpdatedTagMenu = () => {
		let updatedUstensilTagList = [];
		for (const ustensilTag of ustensilsTagList) {
			for (const id of ustensilTag.id) {
				for (const recipe of searchResult) {
					if (recipe.id == id) {
						updatedUstensilTagList.push(ustensilTag);
					}
				}
			}
		}
		// preventing multiple same occurence
		let cleanUpdatedUstensilTagList = new Set([...updatedUstensilTagList]);
		creatingTagList(cleanUpdatedUstensilTagList, 'ustensil', ustensilListDOM);
	};
	ustensilUpdatedTagMenu();
};

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

	// DOM LISTENER for adding new tag and updating taglist
	ingredientsSearchBarInput.addEventListener('keydown', (e) => {
		let ingredientTagResult = ingredientsTagList;
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, ingredientsTagList, 'ingredient'):
				const newTag = new Tag(e.target.value, 'ingredientsColor');
				newTag.createNewTag(e.target.value, 'ingredientsColor');
				// start the query
				searchQuery();
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

	ingredientsSearchBarInput.addEventListener('input', () => {
		// reseting previous list
		ingredientListDOM.innerHTML = '';

		let filteredTagList = [];
		for (const ingredientTag of ingredientsTagList) {
			if (
				ingredientTag.ingredient
					.toLowerCase()
					.match(ingredientsSearchBarInput.value.toLowerCase())
			) {
				filteredTagList.push(ingredientTag);
			}
		}

		creatingTagList(filteredTagList, 'ingredient', ingredientListDOM);
	});

	appliancesSearchBarInput.addEventListener('keydown', (e) => {
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, appliancesTagList, 'appliance'):
				const newTag = new Tag(e.target.value, 'appliancesColor');
				newTag.createNewTag(e.target.value, 'appliancesColor');
				// start the query
				searchQuery();
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

	appliancesSearchBarInput.addEventListener('input', () => {
		// reseting previous list
		applianceListDOM.innerHTML = '';

		let filteredTagList = [];
		for (const applianceTag of appliancesTagList) {
			if (
				applianceTag.appliance
					.toLowerCase()
					.match(appliancesSearchBarInput.value.toLowerCase())
			) {
				filteredTagList.push(applianceTag);
			}
		}

		creatingTagList(filteredTagList, 'appliance', applianceListDOM);
	});

	ustensilsSearchBarInput.addEventListener('keydown', (e) => {
		let errorMessage;
		switch (true) {
			case e.key == 'Enter' &&
				e.keyCode == 13 &&
				checkTagName(e.target.value, ustensilsTagList, 'ustensil'):
				const newTag = new Tag(e.target.value, 'ustensilsColor');
				newTag.createNewTag(e.target.value, 'ustensilsColor');
				// start the query
				searchQuery();
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

	ustensilsSearchBarInput.addEventListener('input', () => {
		// reseting previous list
		ustensilListDOM.innerHTML = '';

		let filteredTagList = [];
		for (const ustensilTag of ustensilsTagList) {
			if (
				ustensilTag.ustensil
					.toLowerCase()
					.match(ustensilsSearchBarInput.value.toLowerCase())
			) {
				filteredTagList.push(ustensilTag);
			}
		}

		creatingTagList(filteredTagList, 'ustensil', ustensilListDOM);
	});
};

// Checking if tag exist in the given tagList
export const checkTagName = (writenTag, tagList, item) => {
	const searchingQueryTagDOM = document.querySelector(
		'.searchBarModifier__tagSelected'
	);
	// getting all the tag selected
	let [...tagSelected] = searchingQueryTagDOM.children;

	let tagAlreadyAdded = false;
	for (const tag of tagSelected) {
		if (
			tag.textContent.slice(0, -1).toLowerCase() === writenTag.toLowerCase()
		) {
			tagAlreadyAdded = true;
		}
	}

	console.log(item);

	let isFound = false;
	for (const tag of tagList) {
		if (tag[item].toLowerCase() === writenTag.toLowerCase()) {
			isFound = true;
		}
	}

	// preventing the addition of the same tag occurence
	if (tagAlreadyAdded) {
		return false;
	} else {
		return isFound;
	}
};

// Handling the openning and closing of the tagsSearchBars
export const tagSearchMenuHandling = () => {
	const ingredientsSearchBarMenu = document.querySelector(
		'#ingredientsSearchBarMenu'
	);
	const ingredientsSearchBarInput = document.querySelector(
		'#ingredientsSearchBarInput'
	);
	const appliancesSearchBarMenu = document.querySelector(
		'#appliancesSearchBarMenu'
	);
	const appliancesSearchBarInput = document.querySelector(
		'#appliancesSearchBarInput'
	);
	const ustensilsSearchBarMenu = document.querySelector(
		'#ustensilsSearchBarMenu'
	);
	const ustensilsSearchBarInput = document.querySelector(
		'#ustensilsSearchBarInput'
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
	ingredientsSearchBarInput.addEventListener('focus', () => {
		//preventing the tag menu from closing while trying to get focus inside
		let parentElem = ingredientsSearchBarInput.parentElement;
		if (!parentElem.classList.contains('tagSearchBarOpen')) {
			tagSearchBarOpenClose(ingredientsSearchBarInput, 'ingredientsColor');
		}
	});

	appliancesSearchBarMenu.addEventListener('click', () => {
		tagSearchBarOpenClose(appliancesSearchBarMenu, 'appliancesColor');
	});
	appliancesSearchBarInput.addEventListener('focus', () => {
		//preventing the tag menu from closing while trying to get focus inside
		let parentElem = appliancesSearchBarInput.parentElement;
		if (!parentElem.classList.contains('tagSearchBarOpen')) {
			tagSearchBarOpenClose(appliancesSearchBarInput, 'appliancesColor');
		}
	});

	ustensilsSearchBarMenu.addEventListener('click', () => {
		tagSearchBarOpenClose(ustensilsSearchBarMenu, 'ustensilsColor');
	});
	ustensilsSearchBarInput.addEventListener('focus', () => {
		//preventing the tag menu from closing while trying to get focus inside
		let parentElem = ustensilsSearchBarInput.parentElement;
		if (!parentElem.classList.contains('tagSearchBarOpen')) {
			tagSearchBarOpenClose(ustensilsSearchBarInput, 'ustensilsColor');
		}
	});
};
