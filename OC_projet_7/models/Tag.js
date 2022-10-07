import { searchQuery } from '../modules/queryHandling.js';

// MODEL
export class Tag {
	constructor(content, backgroundColor) {
		this.content = content;
		this.backgroundColor = backgroundColor;
	}

	createNewTag(content, backgroundColor) {
		const selectedTagDisplayArea = document.querySelector(
			'.searchBarModifier__tagSelected'
		);

		let newTag = document.createElement('div');
		newTag.innerHTML = `${content}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path	d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`;
		newTag.classList.add(backgroundColor);
		selectedTagDisplayArea.append(newTag);

		// adding the closing event
		newTag.children[0].addEventListener('click', () => {
			newTag.remove();
			searchQuery();
		});
	}
}
