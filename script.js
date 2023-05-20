// Variable Used
const favMealList = document.getElementById('fav-meal');
const mealDetailsContent = document.querySelector('.food-details-content');
const favbtn = document.getElementsByClassName("addtofav");
const removebtn = document.getElementsByClassName("remove2");
const eachFavMeal = document.getElementsByClassName("food-item");
const cart = document.getElementsByClassName("cart");
const searchBtn = document.getElementById('input-button');
const mealList = document.getElementById('meal');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Creating Favourite List Where if Local Storage is Not Empty then Food list will be seen
function createFavMealList() {
    let arr = JSON.parse(localStorage.getItem("data"));
    let html = "";
    // Loop to Traverser food id in Local Storage
    let i = 0;
    while (i < arr.length) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[i]}`)
        .then(response => response.json())
        .then(data => {
          if (data.meals) {
            data.meals.forEach(meal => {
              html += `
                <div class="food-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <div class="two-buttons">
                            <a href="#" class="recipe-btn">Show Recipe</a>
                            <button class="remove2" onclick="deleteItem()">Remove</button>
                        </div>
                    </div>
                </div>
              `;
              favMealList.innerHTML = html;
            });
          }
        });
      i++;
    }
  }
  

// Goto HomePage 
function gotoHome(){
    location.href = "index.html";
}
// Get Food Recipe
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// Food procedure and Youtube Video Link
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-instruct">
            <h3><<<<<<<<<<=============Procedure=============>>>>>>>>>></h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Click Here To Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
window.addEventListener('DOMContentLoaded', createFavMealList);
favMealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Deleting Item From List
function deleteItem() {
    for (let i = 0; i < eachFavMeal.length; i++) {
        removebtn[i].addEventListener("click", removeMealFromFav);
    }
}
function removeMealFromFav(evt){
    var indexValue = evt.target.parentElement.parentElement.parentElement.dataset.id;       // Get Food id and Store in Variable
    evt.target.parentNode.parentNode.parentNode.remove();                                   // Removing item 
    let myArray = JSON.parse(localStorage.getItem("data"));                      // Array Creation and Fetching index of deleted food id
    for(let i = 0; i<myArray.length; i++){
        if(indexValue == myArray[i]){
            myArray.splice(i, 1);                                               // Deleting From Local Storage
        }
    }
    localStorage.setItem("data", JSON.stringify(myArray));                      // Updating Local Storage 
}


