# **Weather-Report**

*Time Frame*

Completed in my spare time. It took 7 hours to complete the site I had set out to make. I then went on to add extra functionality for the five day forecast to be filtered by day, which took roughly another 10 hours.

## Project Overview
A weather forecast single-page web application to show current weather based on a location search by the user. It also shows weather for the next 5 days at 3 hour increments. Users can also filter the upcoming weather by day.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- React
- Third Party APIs (Open Weather API: Current Weather Data and 5 Day / 3 Hour Forecast)

## Featured Code

### Five Day Buttons
The next five days change day to day so I wanted to have buttons that will change with them. These buttons then let users filter to the day’s weather information they wish to see. 

I started by setting out the days of the week in an array. I then used ‘new Date ()’ to get today’s date information and then ‘getDay()’ to retrieve the associated number to pull from the array. I continued this to get the next five days by repeating the method and adding 1.  The issue I then ran into is that the number was going beyond the amount of results in the array, so I had to counter it by having a ternary operator to catch anything that went over 6, and then taking off a set amount to get the right result. 

I then used a switch to return the relevant HTML based on which day of the week it was. If it’s Sunday then return the ‘sundayID’ information followed by the next five days. I have an ongoing issue as there are 7 days I need to allow for in my code, but only 6 ever show up at any one time from the API. The current workaround is that I have the full querySelector for each relevant day within the switch so I don’t get an error.


```
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

```
## Challenges

**Time Zone & Thailand** - The 5 day forecast filter buttons work great but if you happen to be looking at a location that is in the future and has already entered into the next day, or doesn’t have a 3 hour forecast increment to display (Thailand is usually the best location to test with), then the 5 day forecast throws up an error. I currently have a catch to not display anything but this is something I will continue to work on to make sure that the location’s time is reflected in the 5 day forecast sections. 

## Wins

**Random Loading Images** - I have a small selection of weather icons that are randomly selected from to display and spin in the background as a page loading icon. This is something I had wanted to use for a previous project to display randomly selected meteorite images. So I’d like to go back and implement this.

**Five Day Buttons** - Although I have listed this above as having some challenges it was also something that I had planned as future content, so being able to implement it fairly quickly was great. The time has been taken with trying to perfect the smaller issues that have come up with multiple locations and time zones to account for. 

**Scroll Snap** - Made the scrolling of the five day forecast look a bit more slick and user friendly, using “scroll-snap-align: center;” for the mobile CSS to center the results, and for the filter buttons the JavaScript has “.scrollTo({left: 0, behavior: "smooth"})” to bring you back to the beginning when filtering to a new day.

## Future Content

* Fix timezone/location bugs.
* Add in some more mobile specific styling to the search bar so it takes up less space and is animated to appear when needed.
* Receive suggestions based on the future forecast; 6 hours of sun: “Hang out your washing!”, rain forecast for the day: “You’ll need an umbrella!”, etc.
