// GLOBAL VARIABLE
const favsArray = JSON.parse(localStorage.getItem('favs')) || []

// ASYNC FUNCTION: Calls API for category information
const categoryOptions = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  try {
    const response = await axios.get(url)
    const data = response.data.categories
    categoryValues(data)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// FUNCTION: Populates category information into dropdown
const categoryValues = dataList => {
  dataList.forEach(element => {
    const select = document.querySelector('#category-dropdown')
    const categories = element.strCategory
    const categoryOption = document.createElement('option')
    categoryOption.value = categories
    categoryOption.textContent = categories
    select.append(categoryOption)
  })
}

// CALLBACK FUNCTION: Get category value
// Calls second API call with category value
const getCategoryValue = e => {
  e.preventDefault()
  const categoryValue = document.querySelector('#category-dropdown').value
  getDishes(categoryValue)
}

// FUNCTION CALL: Category information in dropdown
categoryOptions()

// EVENT LISTENER: Category form 
const categorySubmit = document.querySelector('#category-dropdown')
categorySubmit.addEventListener('change', getCategoryValue)

// ASYNC FUNCTION: CallS API to get dish items into dropdown
const getDishes = async category => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  try {
    const response = await axios.get(url)
    data = response.data.meals
    dishDropdown()
    getDishOptions(data)

    // EVENT LISTENER: Dish form to populate results
    const dishSubmit = document.querySelector('#dish-submit')
    dishSubmit.addEventListener('click', getDishValue)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// FUNCTION: Creates form with dish options
const dishDropdown = () => {
  const categorySection = document.querySelector('.category')

  if(document.querySelector('.dish-form')){
    document.querySelector('.dish-form').remove()
  }

  const dishForm = document.createElement('form')
  dishForm.className = 'dish-form'
  const select = document.createElement('select')
  select.id = 'dish-dropdown'
  dishForm.append(select)
  const submit = document.createElement('button')
  submit.textContent = 'Submit'
  submit.id = 'dish-submit'
  dishForm.append(submit)
  categorySection.append(dishForm)
}

// FUNCTION: Populates dish dropdown
const getDishOptions = dataList => {
  dataList.forEach(element => {
    const dishOption = document.createElement('option')
    const dish = element.strMeal
    dishOption.value = dish
    dishOption.textContent = dish
    const select = document.querySelector('#dish-dropdown')
    select.append(dishOption)
  })
}

// CALLBACK FUNCTION: Dish form
const getDishValue = e => {
  e.preventDefault()
  const dishValue = document.querySelector('#dish-dropdown').value
  createContainer()
  dishInfo(dishValue)
}

// FUNCTION: Creates container
const createContainer = () => {
  const main = document.querySelector('main')
  const containerSection = document.createElement('section')
  containerSection.className = 'container'
  main.append(containerSection)
}

// ASYNC FUNCTION: Calls API to get dish selection
const dishInfo = async dishName => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`
  removeDiv()
  clearInput()
  try {
    const response = await axios.get(url)
    const data = response.data.meals[0]
    appendDiv(data)
  } catch (error) {
    console.log(`Error: ${error}`)
    alert(`No results found`)
  }
}

// FUNCTION: Append dish div 
const appendDiv = data => {
  // Setting Info
  const section = document.querySelector('.container')
  const ingredientSection = document.createElement('ul')
  ingredientSection.className = 'ingredient-list'
  ingredientSection.textContent = 'Ingredient List'
  const div = document.createElement('div')
  div.className = 'dish-div'
  div.id = data.idMeal
  const title = document.createElement('h3')
  title.textContent = data.strMeal
  const website = document.createElement('a')
  website.href = data.strSource
  website.textContent = 'View on Original Website'
  website.setAttribute('target', '_blank')
  const photo = document.createElement('img')
  photo.src = data.strMealThumb
  const instructions = document.createElement('div')
  instructions.textContent = data.strInstructions
  const favoriteButton = document.createElement('button')
  favoriteButton.textContent = 'Favorite'

  // Get Ingredients
  for (item in data) {
    const ingredient = document.createElement('li')
    if (item.substring(3, 6) === 'Ing') {
      ingredient.append(data[item])
      ingredientSection.append(ingredient)
      if (!data[item]) {
        ingredient.remove(data[item])
      }
    } 
  }

  // Append items to the DOM
  section.append(div)
  div.append(title)
  div.append(photo)
  div.append(instructions)
  div.append(ingredientSection)
  div.append(website)
  div.append(favoriteButton)

  // EVENT LISTENER & CALLBACK FUNCTION: Favorite button
  // Add favorite to array and local storage
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
}

// EVENT LISTENER & CALLBACK FUNCTION: Favorites from local storage
// Retrieve from local storage and show on page
const getFavsButton = document.querySelector('.favs')
getFavsButton.addEventListener('click', () => {
  let getFavs = JSON.parse(localStorage.getItem('favs'))
  createContainer()
  removeDiv()
  if (getFavs) {
    getFavs.forEach(data => {
      appendDiv(data)
    })
  }
  
})

// FUNCTION: Remove last child of container
const removeDiv = (id = null) => {
  if (id) {
    const oldDiv = document.getElementById(id)
    if (oldDiv) {
    oldDiv.parentNode.removeChild(oldDiv)
    }
  } else {
    const oldDiv = document.querySelector('.container')
    while (oldDiv.lastChild) {
      oldDiv.removeChild(oldDiv.lastChild)
    }
  }
  
}

// FUNCTION: Get name value from input
const getNameValue = e => {
  e.preventDefault()
  const name = document.querySelector('input').value
  createContainer()
  dishInfo(name)
}

// FUNCTION: Resets input field
const clearInput = () => {
  const input = document.querySelector('input')
  input.value = ''
}

// EVENT LISTENER: Name form
const nameSubmit = document.querySelector('#name-submit')
nameSubmit.addEventListener('click', getNameValue)
