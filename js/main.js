// section 1
//Handle Capital Letters, Place result in DOM, add a check for humpday (Wed)
document.querySelector("#check").addEventListener('click', checkDay)
document.querySelector('#day-clear-button').addEventListener('click', clearDay)

function checkDay() {
  const day = document.querySelector("#day").value.toLowerCase()

  if (day === "monday" || day === "tuesday" || day === "thursday" || day === "friday") {
    alert("You have class.")
  }
  else if (day === "wednesday") {
    alert("It's humpday.")
  }
  else if (day === "saturday" || day === "sunday") {
    alert("It's the weekend!")
  } else {
    alert("Please insert a weekday.")
  }
}

function clearDay() {
  // Clear the input field
  document.querySelector('#day').value = ""
}

// section 2
document.querySelector('#cocktail-button').addEventListener('click', getDrink)
document.querySelector('#clear-button').addEventListener('click', clearDrink)

function getDrink() {
    let drink = document.querySelector('#drink-input').value.toLowerCase()

    // Don't proceed if input is empty
    if (!drink.trim()) {
      alert("Please enter a drink name")
      return
    }

    // Clear existing drink data
    // document.querySelector('#drink-name').innerText = "Loading..."
    // document.querySelector('#drink-image').src = ""
    // document.querySelector('#drink-instructions').innerText = ""

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            
            // check if data.drinks exists and has elements
            if (data.drinks && data.drinks.length > 0) {
                // get random index based on the actual length of the drinks array
                const randomIndex = getRandomIndex(0, data.drinks.length - 1)
                
                // Set drink information with proper error handling
                const drinkInfo = data.drinks[randomIndex]
                document.querySelector('#drink-name').innerText = drinkInfo.strDrink || "Drink name not available"
                
                // Set image with proper error handling
                if (drinkInfo.strDrinkThumb) {
                    document.querySelector('#drink-image').src = drinkInfo.strDrinkThumb
                    document.querySelector('#drink-image').alt = drinkInfo.strDrink
                }
                
                document.querySelector('#drink-instructions').innerText = drinkInfo.strInstructions || "No instructions available"
            } 
            else {
                // handle case when no drinks are found
                document.querySelector('#drink-name').innerText = "No drinks found"
                document.querySelector('#drink-image').src = ""
                document.querySelector('#drink-instructions').innerText = "Try another search term"
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
            document.querySelector('#drink-name').innerText = "Error occurred"
            document.querySelector('#drink-instructions').innerText = "Please try again"
        })
}

function clearDrink() {
    // Clear the input field
    document.querySelector('#drink-input').value = ""
    
    // Clear the header information
    document.querySelector('#drink-name').innerText = ""
    document.querySelector('#drink-image').src = ""
    document.querySelector('#drink-image').alt = ""
    document.querySelector('#drink-instructions').innerText = ""
}

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// section 3
const contestants = document.querySelectorAll('.team')

Array.from(contestants).forEach(element => element.addEventListener('click', checkForRose))

function checkForRose(click) {
    if (click.target.classList.contains('madrid')) {
        document.querySelector('#madrid').classList.toggle('hidden')
    } else {
        alert ('Wrong!');
    }
}