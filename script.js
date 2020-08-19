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

categoryOptions()

// Populates category information into dropdown
function categoryValues(dataList) {
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
function getCategoryValue(e) {
  e.preventDefault()
  const categoryValue = document.querySelector('#category-dropdown').value
  getDishes(categoryValue)
}

// Event listener for category
const categorySubmit = document.querySelector('#category-submit')
categorySubmit.addEventListener('click', getCategoryValue)

// API call to get dish items into dropdown
const getDishes = async(category) => {
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
function dishDropdown() {
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
function getDishOptions(dataList) {
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
function getDishValue(e) {
  e.preventDefault()
  const dishValue = document.querySelector('#dish-dropdown').value
  createContanier()
  dishInfo(dishValue)
}

function createContanier() {
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
    console.log(data)
    appendDiv(data)
  } catch (error) {
    console.log(`Error: ${error}`)
    alert(`No results found`)
  }
  
}

// Append dish div 
function appendDiv(data) {
  // Setting Info
  const section = document.querySelector('.container')
  const ingredientSection = document.createElement('ul')
  ingredientSection.className = 'ingredient-list'
  ingredientSection.textContent = 'Ingredient List'
  const div = document.createElement('div')
  const title = document.createElement('h3')
  title.textContent = data.strMeal
  const website = document.createElement('a')
  website.href = data.strSource
  website.textContent = 'View on Original Website'
  const photo = document.createElement('img')
  photo.src = data.strMealThumb
  const instructions = document.createElement('p')
  instructions.textContent = data.strInstructions

  // Get Ingredients
  for (item in data) {
    // console.log(data[item], item)
    const ingredient = document.createElement('li')
    if (item.substring(3, 6) === 'Ing') {
      ingredient.append(data[item])
      ingredientSection.append(ingredient)

    } 
  }

  // Append
  section.append(div)
  div.append(title)
  div.append(photo)
  div.append(instructions)
  div.append(ingredientSection)
  div.append(website)
}

// Remove last child of container
function removeDiv() {
  const oldDiv = document.querySelector('.container')
  while (oldDiv.lastChild) {
    oldDiv.removeChild(oldDiv.lastChild)
  }
}

// Get name value from input
function getNameValue(e) {
  e.preventDefault()
  const name = document.querySelector('input').value
  dishInfo(name)
}

// Resets input 
function clearInput() {
  const input = document.querySelector('input')
  input.value = ''
}

// Event Listener for name input
const nameSubmit = document.querySelector('#name-submit')
nameSubmit.addEventListener('click', getNameValue)

// Bugs
