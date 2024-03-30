// Shakil-2120290

document.getElementById("searchButton").addEventListener("click", function () {
    var countryName = document.getElementById("searchInput").value;
    fetch(`https://restcountries.com/v3/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        displayCountryData(data);
      })
      .catch((error) => console.log("Error fetching country data:", error));
  });
  

  function displayCountryData(data) {
    var countryDataContainer = document.getElementById("countryData");
    countryDataContainer.innerHTML = "";
  
    data.forEach((country) => {
      var countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
          <h2>${country.name.common}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p id="img-para">Flag: <img src="${country.flags[0]}" alt=${country.name.common}></p>
          <button class="details-button" data-country="${country.name.common}">More Details</button>
        `;
      countryDataContainer.appendChild(countryCard);
    });
  
    
    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", function () {
        var countryName = this.getAttribute("data-country");
        fetchWeatherData(countryName);
      });
    });
  }
  
  function fetchWeatherData(countryName) {
    var api_key = "34a09b96b0ff90011146fe9c98d4bb99";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.main &&
          data.main.temp &&
          data.weather &&
          data.weather[0].description
        ) {
          const temperature = data.main.temp;
          const condition = data.weather[0].description;
  
          const weatherInfo = {
            name: countryName,
            temperature: temperature,
            condition: condition,
  
            region: data.sys.country,
            subregion: data.name,
          };
          // displayWeatherInfo(weatherInfo);
          displayAdditionalDetails(weatherInfo);
        } else {
          alert("Additional data is not available");
          hideAdditionalDetails();
        }
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
        alert("Oooh! There is an error.");
        hideAdditionalDetails();
      });
  }
  
  function displayWeatherInfo(weatherInfo) {
    var weatherInfoElement = document.getElementById("weatherInfo");
    weatherInfoElement.innerHTML = `<p>Temperature: ${weatherInfo.temperature}°C</p>
        <p>Weather: ${weatherInfo.condition}</p>
  
        <p>Region: ${weatherInfo.region}</p>
        <p>Subregion: ${weatherInfo.subregion}</p>`;
  }
  
  function displayAdditionalDetails(countryInfo) {
    var additionalDetailsContainer = document.getElementById(
      "additionalDetailsContainer"
    );
    additionalDetailsContainer.innerHTML = `
        <h2>${countryInfo.name} Additional Details</h2>
        <p>Temperature: ${countryInfo.temperature}°C</p>
        <p>Weather: ${countryInfo.condition}</p>
       
        <p>Region: ${countryInfo.region}</p>
        <p>Subregion: ${countryInfo.subregion}</p>
        <button id="closeButton">Close</button>
      `;
    additionalDetailsContainer.classList.add("show-additional-details");
  
    document.getElementById("closeButton").addEventListener("click", function () {
      hideAdditionalDetails();
    });
  }
  
  function hideAdditionalDetails() {
    var additionalDetailsContainer = document.getElementById(
      "additionalDetailsContainer"
    );
    additionalDetailsContainer.innerHTML = ""; // Clear the content
    additionalDetailsContainer.classList.remove("show-additional-details");
  }
  