// Handling the openning and closing of the tagsSearchBars
export default function tagSearchMenuHandling() {
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
}
