// variables Used 
const favMealList = document.getElementById('fav-meal');
const mealDetailsContent = document.querySelector('.food-details-content');
const favbtn = document.getElementsByClassName("addtofav");
const removebtn = document.getElementsByClassName("remove2");
const eachFavMeal = document.getElementsByClassName("food-item");
const cart = document.getElementsByClassName("cart");
const searchBtn = document.getElementById('input-button');
const mealList = document.getElementById('meal');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// On Click Events
mealList.addEventListener('click', getMealRecipe);
searchBtn.addEventListener('click', getMealList);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

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

// Matched Food result list
function getMealList(){
    let searchInputTxt = document.getElementById('input-data').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <div class="two-buttons">
                                <a href = "#" class = "recipe-btn">Show Recipe</a>
                                <button class="addtofav">Add to Fav</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, This Food Is Not Available Now.";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}

//Goto Favourite Page Function
function gotoFav(){
    location.href = "favouritePage.html";
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

// An Array of All Suggested food name.
const mealName = [ "Apple Frangipan Tart", "Apple & Blackberry Crumble", "Apam balik", "Ayam Percik",
   "Bakewell tart", "Bread and Butter Pudding", "Beef Wellington", "Baingan Bharta", "Beef Brisket Pot Roast",
    "Beef Sunday Roast", "Braised Beef Chilli", "Beef stroganoff", "Broccoli & Stilton soup", "Bean & Sausage Hotpot",
    "Banana Pancakes", "Beef Dimpling Stew", "Beef and Mustard Pie", "Beef and Oyster Pie", "Blackberry Fool",
    "Battenberg Cake", "Beef Bourguignon", "Brie wrapped in prosciutto & brioche", "BeaverTails",
    "Brown Stew Chicken", "Beef Lo Mein", "Baked salmon with fennel & tomatoes", "Budino Di Ricotto",
    "Breakfast Potatoes", "Bitterballen (Dutch meatballs)", "BBQ Pork Sloppy Joes",
    "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber", "Big Mac", "Bigos (Hunters Stew)",
    "Boxty Breakfast", "Beef Rendang", "Burek", "Chcolate Gatean", "Chicken Enchilada Casserole",
    "Cream Cheese Tart", "Christmas Pudding Flapjack", "Chicken Handi", "Chicken Alfredo Primavera", 
    "Chicken Fajita Mac and Cheese", "Cajun spiced fish tacos", "Crock Pot Chicken Baked Tacos", 
    "Chicken Karaage", "Coq au vin", "Chilli prawn linguine", "Clam chowder", "Creamy Tomato Soup", 
    "Chicken & mushroom Hotpot", "Chicken Couscous", "Chocolate Avacodo Mousse", "Choc Chips Pecan Pie", 
    "Chocolate Raspberry Brownies", "Chickpea Fajitas", "Chicken Ham and Leek Pie", "Chicken Parmentier", 
    "Carrot Cake", "Chelsea Buns", "Choclate Souffle", "Chinon Apple Tarts", "Chicken Marengo", 
    "Canadian Butter Tarts", "Chicken Basquaise", "Callaloo Jamaican Style", "Chicken Congee", 
    "Chocolate Caramel Crispy", "Chakchouka", "Cashew Ghoriba Biscuits", "Corba", "Christmas Pudding Trifle", 
    "Classic Christmas pudding", "Christmas cake", "Corned Beef and Cabbage", "Crispy Sausages and Greens", 
    "Chicken Quinoa Greek Salad", "Chick-Fil-A Sandwich", "Coddled pork with cider", "Cevapi Sausages", 
    "Croatian lamb peka", "Croatian Bean Stew", "Chivito uruguayo", "Dal fry", "Dundee cake", "Duck Counfit", 
    "Eton Mess", "Eccles Cakes", "English Breakfast", "Escobitch Fish", "Egg Drop Soup", "Egyptian Fatteh", 
    "Fish pie", "Fettucine alfredo", "Full English Breakfast", "Flamiche", "French Omelette", 
    "Hot Chocolate Fudge", "Hot and Sour Soup", "Jam Roly-Poly", "Key Lime Pie", "Kidney Bean Curry", 
    "Kedgeree", "Kung Pao Chicken", "Kafteji", "Koshari", "Lasagne", "Lamb and Potato pie", "Leblebi Soup", 
    "Matar Paneer", "Minced Beef Pie", "Madeira Cake", "Minve Pies", "Moussaka", "Pad See Ew", "Poutine", 
    "Pancakes", "Pumpkin Pie", "Parkin Cake", "Pate Chinois", "Rappie Pie", "Red Peas Soup", "Roti John", 
    "Spicy Arrabiata Penne", "Squash linguine", "Spanish Tortilla", "Summer Pudding", "Summer Priston", 
    "Sugar Pie", "Stamppot", "Sushi", "Turkey Meatloaf", "Tuna Nicoise", "Tahini Lentils", "Three Fish Pie", 
    "Treacle Tart", "Tourtiere", "Vegan Lasagna", "Wontons", ]

// Suggestions when input is given
function autocomplete(input, list) {
    input.addEventListener('input', function () {                         // Event Listenter for comparing Input Value With All meal
        closeList();                                                      // For Closing the existing list if still open
        if (!this.value)                                                  // Exit From Function when input is Empty.
            return;
        
        suggestions = document.createElement('div');          // Creating Suggestion div, add it to Element with containing input field
        suggestions.setAttribute('id', 'suggestions');
        this.parentNode.appendChild(suggestions);

        // Loop to Traverser all data in List and Find Matches
        let i = 0;
        while (i < list.length) {
          if (list[i].toUpperCase().includes(this.value.toUpperCase())) {
            suggestion = document.createElement('div');
            suggestion.innerHTML = list[i];
            
            suggestion.addEventListener('click', function () {
              input.value = this.innerHTML;
              closeList();
            });
            suggestion.style.cursor = 'pointer';
        
            suggestions.appendChild(suggestion);
          }
          i++;
        }
        
    });
    function closeList() {
        let suggestions = document.getElementById('suggestions');
        if (suggestions)
            suggestions.parentNode.removeChild(suggestions);
    }
}
autocomplete(document.getElementById('input-data'), mealName);

// Function to add favourite items in favourite list
function addmetolist(evt){
    // To get the id of Food item from favourite list when clicked
    var favMealId = evt.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(favMealId);
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }
    var localArray = JSON.parse(localStorage.getItem('data'));
    localArray.push(favMealId);

    localStorage.setItem('data', JSON.stringify(localArray));

    // Display a notification
    displayNotification("Added to Favorites!");
}

// when add to fav button is clicked addmetolist fuction invoked by SetInterval function
setInterval(() => {
    if(favbtn!=null){
        for(let i=0; i<favbtn.length; i++){
            favbtn[i].addEventListener("click", addmetolist);
        }
    }
}, 1000);

// Display notification function
function displayNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


