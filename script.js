let apiKey = undefined;

async function getWeatherData() {

    const city = document.getElementById("locationInput").value.trim();
    
    if (city) {
        
        apiKey = (apiKey === undefined) ? window.prompt("Enter Your Secret API Key: ").trim() : apiKey;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        
        try {
            const response = await fetch(url);
            if (response.ok) {
                const result = await response.json();
                displayWeatherInfo(result);
            }
            else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        }
        catch (error) {

            displayErrorInfo(error.message);
            
            if (error.message === "401: Unauthorized") {
                apiKey = undefined;
            }
        }
    }
    else {
        displayErrorInfo("Please Enter a Valid Location");
    }
}

function displayWeatherInfo(data) {

    const { name: city, 
            sys: {country},
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    hideErrorDisplay();
    const card = document.getElementById("card");
    card.style.display = "block";
    
    const locationDisplay = document.getElementById("locationDisplay").textContent = `${city}, ${country}`;
    const tempDisplay = document.getElementById("tempDisplay").textContent = String((temp - 273.15).toFixed(1)) + ' °C' ;
    const humidityDisplay = document.getElementById("humidityDisplay").textContent = String(humidity.toFixed(0)) + '%' ;
    const descDisplay = document.getElementById("descDisplay").textContent = description;
    const emojiDisplay = document.getElementById("emojiDisplay").textContent = getEmoji(id);
}

function getEmoji(id) {
    let emoji = "";
    if (200 <= id && id < 300) {
        emoji = '⛈';
    }
    else if (300 <= id && id < 400) {
        emoji = '🌦';
    }
    else if (500 <= id && id < 600) {
        emoji = '🌧';
    }
    else if (600 <= id && id < 700) {
        emoji = '❄';
    }
    else if (700 <= id && id < 800) {
        emoji = '🌫';
    }
    else if (800 == id) {
        emoji = '🌤';
    }
    else if (800 <= id && id < 900) {
        emoji = '☁';
    }

    return emoji;
}

function displayErrorInfo(message) {
    console.error(message);
    hideWeatherCard();
    document.getElementById("errorMessage").textContent = message;
    document.getElementById("errorDisplay").style.display = "block";
}

function hideWeatherCard() {
    document.getElementById("card").style.display = "none";
}

function hideErrorDisplay() {
    document.getElementById("errorDisplay").style.display = "none";
}

function refresh() {
    hideWeatherCard();
    hideErrorDisplay();
    const cityInput = document.getElementById("locationInput").value = "";
}