import onFormSubmit from "./weather";
const apiKey = process.env.API_KEY;
const fiveDayForecastDiv = document.querySelector("#fiveDayForecast");
function waitForResponse(res) {
  return res.json();
}

function getLocation() {
  // pull location name from id in weather.js
  const locationName = document.querySelector("#locationName").className;
  /// run api to get the lat and long measurements from Geocoding location name
  const urlLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${apiKey}`
  fetch(urlLocation).then(waitForResponse).then(locateData);
}

function locateData(locationData) {
  // retrieve lat and long data
  const lat = locationData[0].lat;
  const long = locationData[0].lon;
  const units = "metric";
  // use lat and long data to run five day forecast API
  function getFiveDays() {
    const urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`
    fetch(urlFiveDay).then(waitForResponse).then(showFiveDays);
  }
  getFiveDays();
}

function showFiveDays(data) {
  fiveDayForecastDiv.innerHTML = "";
  for (let i = 0; i < data.list.length; i++) {
  // will need For Loop in here to go through each time/date for 5 days
    const temp = Math.trunc(data.list[i].main.temp);
    // const condition = data.list[i].weather[0].main;
    const weatherIconGet = data.list[i].weather[0].icon;
    const weatherIcon = `https://openweathermap.org/img/wn/${weatherIconGet}@2x.png`
    // Help from Coder Rocket Fuel and W3 Schools
    // Had started with the provided API data but decided to use the epoch number to have more formatiing ability on the time/date 
    // Added in a similar getTimeZoneOffset method as used in weather.js to show day/night correctly
    const timezone = data.city.timezone;
    const dtTest = data.list[i].dt;
    const milliseconds = (dtTest+timezone)*1000
    const dateObject = new Date(milliseconds)
    const getLocalTime = (dateObject.getTimezoneOffset()*60)*1000;
    const timeWithZone = milliseconds+getLocalTime;
    const timeResult = new Date(timeWithZone);
    const readableDate = timeResult.toLocaleString("en-GB", {
      weekday: "long",
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour12: "true",
      hour: "numeric"
      // to fix seeing 0 am, and 0 pm
    }).replace(' 0 am', ' 12 am').replace(' 0 pm', ' 12 pm');
    const dayNight = data.list[i].sys.pod;
    // selects correct symbol for time of the day
    const dayNightResult = dayNight == "d" ? "dayImg" : "nightImg";
    // darkens or lightens the box colour depnding on time of day
    const dayNightColor = dayNightResult == "nightImg" ? "rgb(90, 175, 215)" : "rgb(122, 213, 255)"
    const html = `
      <div style="background-color: ${dayNightColor};" class="weatherAheadSections">
        <p id="fiveDayDateString">${readableDate}</p>
        <div id="aside">
          <img src="${weatherIcon}">
        </div>
        <div id="tempDayInfo">
          <p>${temp}&#8451;</p>
          <div class=dayNightImg id="${dayNightResult}"></div>
        </div>
      </div>
    `
     
  fiveDayForecastDiv.innerHTML += html;
  }
}

export default getLocation;