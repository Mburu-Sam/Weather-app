//WEATHER APP
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "199592960e92c6eabd8daefcdd014616";


weatherForm.addEventListener("submit",async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error)
        }
    }
    else{
        displayError("Please enter a valid city name")
    }
});

//function to get weather data
 async function getWeatherData(city){
    //find the API CALL WHERE YOU CAN PASS CITY NAME
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch the weather data");
    }
    return await response.json();
 }


//function to display weather info 
function displayWeatherInfo(data){
const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("cityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDiplay");
    weatherEmoji.classList.add("weatherEmoji");


    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

//function to get weather emoji 
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 200):
        return "⛈"
        case(weatherId >= 300 && weatherId < 400):
        return "⛈"
        case(weatherId >= 500 && weatherId < 600):
        return "⛈"
        case(weatherId >= 600 && weatherId < 700):
        return "🏔"
        case(weatherId >= 700 && weatherId < 800):
        return "☀"
        case(weatherId === 800):
        return "☀"
        case(weatherId >= 800 && weatherId < 810):
        return "☁"
        default:
            return "⁉"

    }
}
// Show loading message
function displayLoading() {
  card.textContent = "Loading...";
  card.style.display = "flex";
}

// Display error message
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
