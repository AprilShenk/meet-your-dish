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

function getCategoryValue(e) {
  e.preventDefault()
  const categoryValue = document.querySelector('#category-dropdown').value
  getDishes(categoryValue)
}

const getDishes = async(category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  try {
    const response = await axios.get(url)
    console.log(response.data.meals)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}



const form = document.querySelector('form')
form.addEventListener('submit', getCategoryValue)