## React Weather Application - Node.js

A simple React.js application for getting the current weather information for a city and then display it nicely for the user to see.

This app will display 5 European cities showing the current weather, sunrise and set times and also the sea levels for the next five days at 9AM.

Weather data is collected from: http://www.openweathermap.org - sign up for a free account to obtain an API key.

## Getting Started
Unzip the archive and move to your favourite location.

`$ cd app_dir/bglweatherapp`
`$ npm install`
`$ npm start`

To change styles with SASS simply use Gulp. This should auto update the page upon file save too.

`$ cd app_dir/bglweatherapp/src`
`$ gulp default`

## Main Application File - App.js

In here we will grab the data from our API using the `getWeather()` function. This then sets the state for results after a Promise has been made so that we can use the data in the `render` function. Upon first load, the data will automatically display from the `componentDidMount()` life cycle function as this fires `this.getWeather()`

There is also a small loading message which will display, the state for `this.isLoaded` is only set to true once the Promise above has been fulfilled.

Finally, we display our `WeatherList` component with some properties passed from our API request. The data comes from `this.state.items` but is defined as `const items` within the `render()` function.

## Weather List - components/weather_list.js

This file simply displays each cities weather, it also has a click function to show the sea levels for the next 5 days for the selected city.

`getSeaLevels()` returns the forecast from the API for the selected city for the next 5 days. Again, this data assigns itself to `this.state`. We also have the `<ul>` hidden until the button is clicked, this uses similar logic mentioned above - in this case its `this.state.isHidden`

`this.sate.sealevels` is set from a `forEach` loop of selected keys, these keys are always the index for 9AM for each given day.

Sea levels are then finally pushed in an `<li>` list from `map()` via `const seaLevelListItems`, we then use this `const` below to display like so `{seaLevelListItems}`

`formatDate()` simply formats a UNIX timestamp as this is how it's returned from the API.