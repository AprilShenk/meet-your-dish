// Calls API for information
const categoryOptions = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  try {
    const response = await axios.get(url)
    const data = response.data.categories
    // console.log(data)
    categoryValues(data)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Populates category information into dropdown
const categoryValues = dataList => {
  dataList.forEach(element => {
    const select = document.querySelector('#category-dropdown')
    const categories = element.strCategory
    const categoryOption = document.createElement('option')
    categoryOption.value = categories
    categoryOption.textContent = categories
    // categoryOption.className = 'category'
    select.append(categoryOption)
  })
}

// Event listener callback function to get category
// Calls second API call with category
const getCategoryValue = e => {
  e.preventDefault()
  const categoryValue = document.querySelector('#category-dropdown').value
  getDishes(categoryValue)
}

categoryOptions()

// Event listener for category
const categorySubmit = document.querySelector('#category-dropdown')
categorySubmit.addEventListener('change', getCategoryValue)

// API call to get dish items into dropdown
const getDishes = async category => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  try {
    const response = await axios.get(url)
    data = response.data.meals
    dishDropdown()
    getDishOptions(data)
    // Event listener
    const dishSubmit = document.querySelector('#dish-submit')
    dishSubmit.addEventListener('click', getDishValue)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Creates dish form
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

// Populates dish dropdown
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

// Event listener callback for dish
const getDishValue = e => {
  e.preventDefault()
  const dishValue = document.querySelector('#dish-dropdown').value
  createContainer()
  dishInfo(dishValue)
}

// Creates section container
const createContainer = () => {
  const main = document.querySelector('main')
  const containerSection = document.createElement('section')
  containerSection.className = 'container'
  main.append(containerSection)
}

// API call to get dish selection
const dishInfo = async dishName => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`
  removeDiv()
  clearInput()
  try {
    const response = await axios.get(url)
    const data = response.data.meals[0]
    // console.log(data)
    appendDiv(data)
  } catch (error) {
    console.log(`Error: ${error}`)
    alert(`No results found`)
  }
  
}

const favsArray = []

// Append dish div 
const appendDiv = data => {
  // Setting Info
  const section = document.querySelector('.container')
  const ingredientSection = document.createElement('ul')
  ingredientSection.className = 'ingredient-list'
  ingredientSection.textContent = 'Ingredient List'
  const div = document.createElement('div')
  div.className = 'dish-div'
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
  favoriteButton.textContent = 'fav'

  // Get Ingredients
  for (item in data) {
    // console.log(data[item], item)
    const ingredient = document.createElement('li')
    if (item.substring(3, 6) === 'Ing') {
      ingredient.append(data[item])
      ingredientSection.append(ingredient)
      if (!data[item]) {
        ingredient.remove(data[item])
      }
    } 
  }

  // Append
  section.append(div)
  div.append(title)
  div.append(photo)
  div.append(instructions)
  div.append(ingredientSection)
  div.append(website)
  div.append(favoriteButton)

  // Event listener to add to array and local storage
  favoriteButton.addEventListener('click', () => {
    favsArray.push(data)
    localStorage.setItem('favs', JSON.stringify(favsArray))
  })

}

// Event listener to retrieve from local storage and show on page
const getFavsButton = document.querySelector('.favs')
getFavsButton.addEventListener('click', () => {
  let getFavs = JSON.parse(localStorage.getItem('favs'))
  console.log(getFavs)
  createContainer()
  removeDiv()
  getFavs.forEach(data => {
    appendDiv(data)
  })
})


// Remove last child of container
const removeDiv = () => {
  const oldDiv = document.querySelector('.container')
  console.log(oldDiv.lastChild)
  while (oldDiv.lastChild) {
    oldDiv.removeChild(oldDiv.lastChild)
  }
}

// Get name value from input
const getNameValue = e => {
  e.preventDefault()
  const name = document.querySelector('input').value
  createContainer()
  dishInfo(name)
}

// Resets input 
const clearInput = () => {
  const input = document.querySelector('input')
  input.value = ''
}

// Event Listener for name input
const nameSubmit = document.querySelector('#name-submit')
nameSubmit.addEventListener('click', getNameValue)
