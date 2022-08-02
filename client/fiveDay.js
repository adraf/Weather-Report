import onFormSubmit from "./weather";
const apiKey = process.env.API_KEY;
const fiveDayForecastDiv = document.querySelector("#fiveDayForecast");
const fiveDayButtons = document.querySelector("#fiveDayButtons");
function waitForResponse(res) {
  return res.json();
}

function getLocation() {
  fiveDayForecastDiv.innerHTML = "";
  // fiveDayForecastDiv.innerHTML = `<div id="loadingScreen"></div>`;
  // generate random loading image
  // const weatherImages = [
  //   'url("https://openweathermap.org/img/wn/02d@2x.png")',
  //   'url("https://openweathermap.org/img/wn/09d@2x.png")',
  //   'url("https://openweathermap.org/img/wn/10d@2x.png")',
  //   'url("https://openweathermap.org/img/wn/11d@2x.png")',
  // ];
  // const pic = document.querySelector("#loadingScreen");
  // function showLoadingImg() {
  //   const picMath = Math.floor(Math.random() * weatherImages.length);
  //   const randomLoadImg = weatherImages[picMath];
  //   pic.style.backgroundImage = randomLoadImg;
  // }
  // showLoadingImg();
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
    fetch(urlFiveDay).then(waitForResponse).then(showFiveDays)
    // .catch(error);
  }
  getFiveDays();
}

function error() {
  const fiveDayForecastDiv = document.querySelector("#fiveDayForecast");
  const errorMsg = `
    <div id="errorMsgDiv">
      <p>Unfortunately I'm unable to retrieve the five day forecast for that location.</p>
    </div>
  `
  fiveDayForecastDiv.innerHTML = errorMsg;
}


function showFiveDays(data) {
  for (let i = 0; i < data.list.length; i++) {
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

    // Adds ID to div class
    let dayMarker = readableDate.slice(0, 2);

    const html = `
      <div style="background-color: ${dayNightColor};" class="weatherAheadSections ${dayMarker}" id="${dayMarker}">
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

  fiveDayButtons.innerHTML = "";

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const d = new Date ();
  let dayOfWeek = daysOfWeek[d.getDay()];
  const nextDay = new Date (d)

  let dayofWeek1Day = nextDay.getDay()+1
  let dayOfWeek1Calc = (dayofWeek1Day>6) ? dayofWeek1Day-7 : dayofWeek1Day;
  let dayOfWeek1Result = daysOfWeek[dayOfWeek1Calc];
  let dayofWeek2Day = nextDay.getDay()+2
  let dayOfWeek2Calc = (dayofWeek2Day>6) ? dayofWeek1Day-6 : dayofWeek2Day;
  let dayOfWeek2Result = daysOfWeek[dayOfWeek2Calc];
  let dayofWeek3Day = nextDay.getDay()+3
  let dayOfWeek3Calc = (dayofWeek3Day>6) ? dayofWeek1Day-5 : dayofWeek3Day;
  let dayOfWeek3Result = daysOfWeek[dayOfWeek3Calc];
  let dayofWeek4Day = nextDay.getDay()+4
  let dayOfWeek4Calc = (dayofWeek4Day>6) ? dayofWeek1Day-4 : dayofWeek4Day;
  let dayOfWeek4Result = daysOfWeek[dayOfWeek4Calc];
  let dayofWeek5Day = nextDay.getDay()+5
  let dayOfWeek5Calc = (dayofWeek5Day>6) ? dayofWeek1Day-3 : dayofWeek5Day;
  let dayOfWeek5Result = daysOfWeek[dayOfWeek5Calc];

  const sundayID = '[id*="Su"]'
  const mondayID = '[id*="Mo"]'
  const tuesdayID = '[id*="Tu"]'
  const wednesdayID = '[id*="We"]'
  const thursdayID = '[id*="Th"]'
  const fridayID = '[id*="Fr"]'
  const saturdayID = '[id*="Sa"]'
  const theNextFiveDays = `
    <li class="filterDays" id="${dayOfWeek1Result}">${dayOfWeek1Result.slice(0, 1)}</li>
    <li class="filterDays" id="${dayOfWeek2Result}">${dayOfWeek2Result.slice(0, 1)}</li>
    <li class="filterDays" id="${dayOfWeek3Result}">${dayOfWeek3Result.slice(0, 1)}</li>
    <li class="filterDays" id="${dayOfWeek4Result}">${dayOfWeek4Result.slice(0, 1)}</li>
    <li class="filterDays" id="${dayOfWeek5Result}">${dayOfWeek5Result.slice(0, 1)}</li>
    `;

// added full query selectors into switch as I would get an error message as 7th day would not exist yet when made as a variable.
  switch (dayOfWeek) {
    case ("Su"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(sundayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(sundayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("Mo"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(mondayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(mondayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("Tu"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(tuesdayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(tuesdayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("We"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(wednesdayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(wednesdayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("Th"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(thursdayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(thursdayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("Fr"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(fridayID)[0].innerText.slice(0, 2)}">${document.querySelectorAll(fridayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    case ("Sa"):
      // htmlTest =
      fiveDayButtons.innerHTML =
      `
      <ul id="fiveDayBtnList">
        <li class="filterDays" id="all">All</li>
        <li class="filterDays" id="${document.querySelectorAll(saturdayID)[0].innerText.slice(0, 1)}">${document.querySelectorAll(saturdayID)[0].innerText.slice(0, 1)}</li>
        ${theNextFiveDays}
      </ul>
      `
      break;
    default:
      break;
  }
  // fiveDayButtons.innerHTML = htmlTest


// Filter the 5 day forecast by day or All
  document.body.addEventListener('click', function(event) {
    let dayFilter = event.target.closest(".filterDays");
    if(dayFilter) {
      onButtonSelect(dayFilter.id);
      function onButtonSelect() {
        // fiveDayForecastDiv.scrollTo({left: 0, behavior: "smooth"});
        const weatherAheadSections = document.querySelectorAll(".weatherAheadSections");
        const allBtns = document.querySelectorAll(".filterDays");
        for (let i = 0; i < weatherAheadSections.length; i++) {
          const weatherSectionsID = weatherAheadSections[i].id;
          if ((weatherSectionsID === (dayFilter).id) || ((dayFilter).id === "all")) {
            weatherAheadSections[i].style.display = "flex";
            // re-set all buttons
            allBtns.forEach(btn => btn.style.backgroundColor = "rgb(49, 85, 126)")
            allBtns.forEach(btn => btn.style.color = "white")
            // change active button
            dayFilter.style.backgroundColor = "rgb(122, 213, 255)";
            dayFilter.style.color = "rgb(49, 85, 126)"
            // scroll list back to beginning
            fiveDayForecastDiv.scrollTo({left: 0, behavior: "smooth"});
          } else if (weatherSectionsID !== (dayFilter).id) {
            weatherAheadSections[i].style.display = "none";
          }
        }    					 
      }
    }
  });
}
export default getLocation;