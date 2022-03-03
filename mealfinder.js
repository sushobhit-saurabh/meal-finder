const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealEl = document.getElementById('meal');
const resultHeading = document.getElementsByClassName('result-heading');
const single_mealEl = document.getElementById('single-meal');



function searchMeal(e) {
    e.preventDefault();

    resultHeading.innerHTML = "";
    //clear single meal
    single_mealEl.innerHTML = "";

    //get search meal
    const choice = search.value;

    //check for empty
    if (choice.trim()) {


        fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${choice}`)
            .then((res) => res.json())
            .then((data) => {

                resultHeading.innerHTML = `<h2> Search Result for ${choice}:</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There Are No Result for '${choice}' Try Again </p>`;

                } else {
                    mealEl.innerHTML = data.meals.map(
                            meal => `
                      <div class ="meal">
                      <img src ="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                      <div class="meal-info" data-mealID="${meal.idMeal}"/>
                      <h3>${meal.strMeal}</h3></div>
                      </div>`
                        )
                        .join("");

                }
            })
        search.value = "";


    } else {
        alert("Please insert a valuae in Search");
    }
}
// fetch meal by ID
function getMealById(mealID) {
    console.log(mealID);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}






// event listenears
submit.addEventListener("submit", searchMeal);

mealEl.addEventListener("click", (bhosdk) => {
    const mealInfo = bhosdk.path.find((item) => {
        if (item.classList) {
            return item.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});