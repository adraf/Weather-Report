import "dotenv/config";
import getLocation from "./fiveDay";

// Base URL
const url = "https://api.openweathermap.org/data/2.5/weather";
const outputDiv = document.querySelector("#output");
const apiKey = process.env.API_KEY;


// Required Parameters
// API Key ("appid") 
// Use geocoding ("q") - City Name

// Optional Parameters
// Unit of measurement ("units") - Metric

function displayCurrentWeather(responseData) {
  const locationName = responseData.name;
  const currentTemp = Math.trunc(responseData.main.temp);
  const minTemp = Math.trunc(responseData.main.temp_min);
  const maxTemp = Math.trunc(responseData.main.temp_max);
  const weatherIconGet = responseData.weather[0].icon;
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherIconGet}@2x.png`
  // similar method as fiveDay.js file to get the result and format it
  const getSunrise = responseData.sys.sunrise*1000;
    const dateObjectRise = new Date(getSunrise)
    const sunriseResult = dateObjectRise.toLocaleString("en-GB", {
      hour12: "true",
      hour: "numeric"
    })
  const getSunset = responseData.sys.sunset*1000;
  const dateObjectSet = new Date(getSunset)
  const sunsetResult = dateObjectSet.toLocaleString("en-GB", {
    hour12: "true",
    hour: "numeric"
  })
  const html = `
    <div id="mainDashboard">
      <p class="${locationName}" id="locationName">${locationName}</p>
      <div id="aside">
        <img src="${weatherIcon}">
      </div>
      <p>${currentTemp}&#8451;</p>
    </div>
    <div id="gridDashboard">
      <div id="sectionOne">
        <section>
          <div id="maxTempImg"></div>
          <p>${maxTemp}&#8451;</p>
        </section>
        <section>
          <div id="minTempImg"></div>
          <p>${minTemp}&#8451</p>
        </section>
      </div>
      <div id="sectionTwo">
        <section>
          <div id="sunriseImg"></div>
          <p>${sunriseResult}</p>
        </section>
        <section>
          <div id="sunsetImg"></div>
          <p>${sunsetResult}</p>
        </section>
      </div>
    </div>
  `;
  outputDiv.innerHTML = html;
}

function waitForResponse(res) {
  return res.json();
}

function fetchCurrentWeather(weatherLocation = "London") {
  outputDiv.innerHTML = `<div id="loadingScreen"></div>`;
  const units = "metric";
  const queryString = `?q=${weatherLocation}&appid=${apiKey}&units=${units}`;
  fetch(url + queryString).then(waitForResponse).then(displayCurrentWeather).then(getLocation).catch(error);
}

function error() {
  const fiveDayForecastDiv = document.querySelector("#fiveDayForecast");
  const errorMsg = `
    <div id="errorMsgDiv">
      <p>Oops, I don't recognise that location.<br>Double check the spelling and try again!</p>
    </div>
  `
  outputDiv.innerHTML = errorMsg
  // to remove five day forecast if location isn't recognised
  fiveDayForecastDiv.innerHTML = "";
}

const form = document.querySelector("form");

function onFormSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("input");
  // if search box empty, still use default
  const weatherLocation = input.value.trim() === "" ? "London" : input.value;
  fetchCurrentWeather(weatherLocation);
}
// sets a default location
fetchCurrentWeather();
// uses user input location
form.addEventListener("submit", onFormSubmit);

export default onFormSubmit;