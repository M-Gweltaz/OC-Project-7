export class Recipe {
	constructor(
		id,
		name,
		servings,
		ingredients,
		time,
		description,
		appliance,
		ustensils
	) {
		this.id = id;
		this.name = name;
		this.servings = servings;
		this.ingredients = ingredients;
		this.time = time;
		this.description = description;
		this.appliance = appliance;
		this.ustensils = ustensils;
	}

	createNewRecipeCard(name, ingredients, time, description) {
		// creating the ingredient part of the card
		let ingredientsItems = document.createElement('div');
		ingredientsItems.classList.add('recipeCard__infos--ingredients');
		ingredients.forEach((ingredient) => {
			switch (true) {
				case ingredient.quantity == undefined:
					ingredientsItems.innerHTML += `<p><span>${ingredient.ingredient}</span></p>`;
					break;

				case ingredient.unit == undefined:
					ingredientsItems.innerHTML += `<p><span>${ingredient.ingredient}: </span>${ingredient.quantity}</p>`;
					break;

				default:
					ingredientsItems.innerHTML += `<p><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit}</p>`;
			}
		});

		// managing the lenght of the text description
		let lightDescription = description;
		if (description.length > 350) {
			lightDescription = description.slice(0, 350);
			lightDescription = lightDescription += '...';
		}

		let newRecipeCard = document.createElement('div');
		newRecipeCard.classList.add('recipeCard');
		newRecipeCard.innerHTML = `<div class="recipeCard__img"></div>
        <div class="recipeCard__description">
        <div class="recipeCard__header">
                <h2 class="recipeCard__header--title">${name}</h2>
                <div class="recipeCard__header--timer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        ="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style="fill: #000000"
                    >
                        <path
                            d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 12 2 C 17.523438 2 22 6.476563 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476563 22 2 17.523438 2 12 C 2 6.476563 6.476563 2 12 2 Z M 10.9375 3.875 L 10.5 12.0625 L 10.59375 12.9375 L 16.75 18.375 L 17.71875 17.375 L 12.625 11.96875 L 12.1875 3.875 Z"
                        ></path>
                    </svg>
                    <p>${time} min</p>
                </div>
            </div>
            <div class="recipeCard__infos">
				<div class="recipeCard__infos--ingredients">
					${ingredientsItems.innerHTML}
				</div>
                 <div class="recipeCard__infos--steps">
                    <p>${lightDescription}</p>
                </div>
            </div>
        </div>`;
		const searchResultList = document.querySelector('.searchResults');
		searchResultList.append(newRecipeCard);
	}

	// getting all ingredients from all recipes
	getIngredientsTagList(id, ingredients, ingredientsTagList) {
		ingredients.forEach((ingredient) => {
			let ingredientNotAdded = true;
			// checking if the ingredient already exist
			ingredientsTagList.forEach((ingredientTag) => {
				if (
					ingredientTag.ingredient.toLowerCase() ===
					ingredient.ingredient.toLowerCase()
				) {
					ingredientTag.id.push(id);
					ingredientNotAdded = false;
				}
			});
			// else create a new entry
			if (ingredientNotAdded == true) {
				ingredientsTagList.push({
					ingredient: ingredient.ingredient,
					id: [id],
				});
			}
		});
	}

	// getting all appliances from all recipes
	getApplianceTagList(id, appliance, appliancesTagList) {
		let applianceNotAdded = true;
		// checking if the appliance already exist
		appliancesTagList.forEach((applianceTag) => {
			if (applianceTag.appliance.toLowerCase() === appliance.toLowerCase()) {
				applianceTag.id.push(id);
				applianceNotAdded = false;
			}
		});
		// else create a new entry
		if (applianceNotAdded == true) {
			appliancesTagList.push({ appliance: appliance, id: [id] });
		}
	}

	// getting all ustensils from all recipes
	getUstensilsTagList(id, ustensils, ustensilsTagList) {
		ustensils.forEach((ustensil) => {
			let ustensilNotAdded = true;
			// checking if the ustensil already exist
			ustensilsTagList.forEach((ustensilTag) => {
				if (ustensilTag.ustensil.toLowerCase() === ustensil.toLowerCase()) {
					ustensilTag.id.push(id);
					ustensilNotAdded = false;
				}
			});
			// else create a new entry
			if (ustensilNotAdded == true) {
				ustensilsTagList.push({ ustensil: ustensil, id: [id] });
			}
		});
	}
}
