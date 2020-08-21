# Project Overview

## Project Name

[Taste The Best](https://aprilshenk.github.io/taste-the-best/)

## Project Description

Allows user to find via search and via category for recipes. They will be able to see an image, original website, and full recipe. 

## API and Data Sample

[TheMealDB](https://www.themealdb.com/api.php)

Sample JSON:
```json
{
    "meals": [
        {
            "idMeal": "52863",
            "strMeal": "Vegetarian Casserole",
            "strDrinkAlternate": null,
            "strCategory": "Vegetarian",
            "strArea": "British",
            "strInstructions": "Heat the oil in a large, heavy-based pan. Add the onions and cook gently for 5 – 10 mins until softened.\r\nAdd the garlic, spices, dried thyme, carrots, celery and peppers and cook for 5 minutes.\r\nAdd the tomatoes, stock, courgettes and fresh thyme and cook for 20 - 25 minutes.\r\nTake out the thyme sprigs. Stir in the lentils and bring back to a simmer. Serve with wild and white basmati rice, mash or quinoa.",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/vptwyt1511450962.jpg",
            "strTags": "Casserole,Vegetarian",
            "strYoutube": "https://www.youtube.com/watch?v=oHmKE9mWtWM",
            "strIngredient1": "Rapeseed Oil",
            "strIngredient2": "Onion",
            "strIngredient3": "Garlic",
            "strIngredient4": "Paprika",
            "strIngredient5": "Cumin",
            "strIngredient6": "Thyme",
            "strIngredient7": "Carrots",
            "strIngredient8": "Celery",
            "strIngredient9": "Red Pepper",
            "strIngredient10": "Yellow Pepper",
            "strIngredient11": "Tomato",
            "strSource": "https://www.bbcgoodfood.com/recipes/1993645/vegetarian-casserole",
            "dateModified": null
        }
    ]
}
```

## Wireframes

[Mobile View](https://wireframe.cc/vgF7JQ) and 
[Computer View](https://wireframe.cc/AeBPyN)

#### MVP 

- Allow users to search via category or name.
- Get information from an API and display after search.
- Elements appear at the bottom of the page. 
- Buttons change when hovered over.

#### PostMVP  

- Implement a view more information drop down for mobile.
- Use local storage to save user favorites.
- Add additional media query. 

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|August 14-16| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|August 17| Project Approval / Pseudocode / Base HTML & CSS | Complete
|August 18| CSS Flexbox Styling / Retrive API Data | Complete
|August 19| DOM manipulation / Event Listeners | Complete
|August 20| Advanced CSS / Addiontal Features | Complete
|August 21| Presentations | Incomplete

## Priority Matrix

[Priority Matrix](https://res.cloudinary.com/ams17b20/image/upload/v1597525586/Matrix/Priority%20Matrix.png)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Pseudocode | L | 1hrs| 1hrs | 1hrs |
| Base HTML & CSS | M | 2hrs| 2hrs | 2hrs |
| CSS Flexbox Styling | H | 3hrs| 3hrs | 3hrs |
| Media Query | M | 3hrs| 2.5hrs | 2.5hrs |
| Event Listeners | M | 2hrs| 1hrs | 1hrs |
| Retrive API Data | H | 2hrs| 2hrs | 2hrs |
| Working with API Data | M | 3hrs| 3hrs | 3hrs |
| DOM manipulation | M | 3hrs| 2hrs | 2hrs |
| Appending Elements | M | 2hrs| 2hrs | 2hrs |
| Add Dynamic HTML and CSS | L | 3hrs| 1hrs | 1hrs |
| Advanced CSS | L | 2hrs| 1.5hrs | 1.5hrs |
| Testing and Debugging CSS | M | 3hrs| 3hrs | 3hrs |
| Testing and Debugging Functionality | M | 3hrs| 3hrs | 3hrs |
| Local Storage | L | --hrs| 3hrs | 3hrs |
| Total | H | 32hrs| 30hrs | 30hrs |

## Code Snippet

The below code provides functionality that removes items from the local users favorites. 

```
favoriteButton.addEventListener('click', () => {
    if (favsArray.length) {
      const existingFavId = favsArray.findIndex(fav => fav.idMeal === data.idMeal)
      if (existingFavId === -1) {
        favsArray.push(data)
        localStorage.setItem('favs', JSON.stringify(favsArray)) 
      } else {
        favsArray.splice(existingFavId, 1)
        localStorage.setItem('favs', JSON.stringify(favsArray)) 
        removeDiv(data.idMeal)
      }
    } else {
      favsArray.push(data)
      localStorage.setItem('favs', JSON.stringify(favsArray))
    }
     
  })
```

## Change Log
- I left off the amounts for each ingredients because they were coming from different keys and it was difficult to style properly. 
- I used an overlay scroll for additional text instead of a view more button because it was easier when working with the API data. 
