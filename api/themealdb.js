const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories || [];
}

export async function getMealsByCategory(category) {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals || [];
}

export async function searchMealByName(name) {
  const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
  const data = await response.json();
  return data.meals || [];
}

export async function getMealDetails(idMeal) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}