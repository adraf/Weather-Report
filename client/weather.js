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
   const currentTempColor = (currentTemp <= 0 ) ? `id="currentTempBackground" style="filter: invert(14%) sepia(48%) saturate(6944%) hue-rotate(238deg) brightness(83%) contrast(117%);"` 
  : (currentTemp > 0 && currentTemp <= 10) ? `id="currentTempBackground" style="filter: invert(70%) sepia(45%) saturate(656%) hue-rotate(141deg) brightness(85%) contrast(84%);"` 
  : (currentTemp >10 && currentTemp <= 20) ? `id="currentTempBackground" style="filter: invert(85%) sepia(63%) saturate(372%) hue-rotate(10deg) brightness(104%) contrast(96%);"`
  : (currentTemp > 20 && currentTemp <= 30) ? `id="currentTempBackground" style="filter: invert(90%) sepia(13%) saturate(2066%) hue-rotate(341deg) brightness(103%) contrast(104%);"`
  : (currentTemp > 30 && currentTemp <= 40) ? `id="currentTempBackground" style="filter: invert(52%) sepia(33%) saturate(1292%) hue-rotate(324deg) brightness(99%) contrast(90%);"`
  :(currentTemp > 40 && currentTemp <= 50) ? `id="currentTempBackground" style="filter: invert(12%) sepia(98%) saturate(3680%) hue-rotate(356deg) brightness(94%) contrast(100%);"`
  : "";
  const minTemp = Math.trunc(responseData.main.temp_min);
  const minTempColor = (minTemp <= 0 ) ? `<div id="minTempImg" <span style="filter: invert(14%) sepia(48%) saturate(6944%) hue-rotate(238deg) brightness(83%) contrast(117%);"></span></div>`
  : (minTemp > 0 && minTemp <= 10) ? `<div id="minTempImg" <span style="filter: invert(70%) sepia(45%) saturate(656%) hue-rotate(141deg) brightness(85%) contrast(84%);"></span></div>` 
  : (minTemp >10 && minTemp <= 20) ? `<div id="minTempImg" <span style="filter: invert(85%) sepia(63%) saturate(372%) hue-rotate(10deg) brightness(104%) contrast(96%);"></span></div>`
  : (minTemp > 20 && minTemp <= 30) ? `<div id="minTempImg" <span style="filter: invert(90%) sepia(13%) saturate(2066%) hue-rotate(341deg) brightness(103%) contrast(104%);"></span></div>`
  : (minTemp > 30 && minTemp <= 40) ? `<div id="minTempImg" <span style="filter: invert(52%) sepia(33%) saturate(1292%) hue-rotate(324deg) brightness(99%) contrast(90%);"></span></div>`
  :(minTemp > 40 && minTemp <= 50) ? `<div id="minTempImg" <span style="filter: invert(12%) sepia(98%) saturate(3680%) hue-rotate(356deg) brightness(94%) contrast(100%);"></span></div>`
  : "";
  const maxTemp = Math.trunc(responseData.main.temp_max);
  const maxTempColor = (maxTemp <= 0 ) ? `<div id="maxTempImg" <span style="filter: invert(14%) sepia(48%) saturate(6944%) hue-rotate(238deg) brightness(83%) contrast(117%);"></span></div>`
  : (maxTemp > 0 && maxTemp <= 10) ? `<div id="maxTempImg" <span style="filter: invert(70%) sepia(45%) saturate(656%) hue-rotate(141deg) brightness(85%) contrast(84%);"></span></div>` 
  : (maxTemp >10 && maxTemp <= 20) ? `<div id="maxTempImg" <span style="filter: invert(85%) sepia(63%) saturate(372%) hue-rotate(10deg) brightness(104%) contrast(96%);"></span></div>`
  : (maxTemp > 20 && maxTemp <= 30) ? `<div id="maxTempImg" <span style="filter: invert(90%) sepia(13%) saturate(2066%) hue-rotate(341deg) brightness(103%) contrast(104%);"></span></div>`
  : (maxTemp > 30 && maxTemp <= 40) ? `<div id="maxTempImg" <span style="filter: invert(52%) sepia(33%) saturate(1292%) hue-rotate(324deg) brightness(99%) contrast(90%);"></span></div>`
  :(maxTemp > 40 && maxTemp <= 50) ? `<div id="maxTempImg" <span style="filter: invert(12%) sepia(98%) saturate(3680%) hue-rotate(356deg) brightness(94%) contrast(100%);"></span></div>`
  : "";
  const weatherIconGet = responseData.weather[0].icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherIconGet}@2x.png`
  // Adjust for time zones
  // Get getTimeZoneOffset for location, take the number difference and times it by 60 for seconds, then by 1000 for epoch
  // similar method as fiveDay.js file to get the result and format it
  const timezone = responseData.timezone;
  const getSunrise = (responseData.sys.sunrise+timezone)*1000;
  const dateObjectSunrise = new Date(getSunrise);
  const getLocalTimeZone = (dateObjectSunrise.getTimezoneOffset()*60)*1000; //
  const sunMinusZone = getSunrise+getLocalTimeZone;
  const timeRiseResult = new Date(sunMinusZone);
    const sunriseResult = timeRiseResult.toLocaleString("en-GB", {
      hour12: "true",
      hour: "numeric",
      minute: "numeric"
    })
  const getSunset = (responseData.sys.sunset+timezone)*1000;
  const dateObjectSunset = new Date(getSunset);
  const getLocalTimeZoneSet = (dateObjectSunset.getTimezoneOffset()*60)*1000; //
  const sunMinusZoneSet = getSunset+getLocalTimeZoneSet;
  const timeSetResult = new Date(sunMinusZoneSet)
  const sunsetResult = timeSetResult.toLocaleString("en-GB", {
    hour12: "true",
    hour: "numeric",
    minute: "numeric"
  })
  const html = `
    <div id="mainDashboard">
      <p class="${locationName}" id="locationName">${locationName}</p>
      <div id="aside">
        <img src="${weatherIcon}">
      </div>
      <div id="currentTempContainer">
        <div ${currentTempColor}>
        </div>
        <p id="currentTemp">${currentTemp}<span style="font-weight: 400;">&#8451;</span></p>
      </div>
    </div>
    <div id="gridDashboard">
      <div id="sectionOne">
        <section>
          ${maxTempColor}
          <p>${maxTemp}&#8451;</p>
        </section>
        <section>
          ${minTempColor}
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

form.addEventListener("submit", snapToStart)
function snapToStart() {
  const fiveDaySection = document.querySelector("#fiveDayForecast");
  // find width of user window
  const fullWidth = window.innerWidth;
  // set five day section back to start on form submit
  fiveDaySection.scrollLeft -=fullWidth*10;
}

// sets a default location
fetchCurrentWeather();
// uses user input location
form.addEventListener("submit", onFormSubmit);

export default onFormSubmit;