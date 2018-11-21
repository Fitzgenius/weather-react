import React from 'react';
import WeatherList from './components/weather_list';
import Header from "./components/header";
import Footer from "./components/footer";

import "./css/animate.css";
import "./css/main.css";

const ApiKey = "873b444dfc0c64bcdce325bd495a21bf";
const CityListNames = ['Peterborough', 'London', 'Brighton', 'Liverpool', 'Cardiff'];

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

  }

  // Fire our function below on app load
  componentDidMount() {
    this.getWeather();
  }

  // getWeather - make api call
  getWeather = () => {

    // Loop through our cities list here to gather data 
    // I realised after doing all this you can request multiple cities in one request..instead of five... doh   
    Promise.all(CityListNames.map(function (name) {
        let api_url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q="+name+",UK&appid="+ApiKey;
        return fetch(api_url)
        .then(res => res.json());
    })).then((results) => {
        this.setState({
          isLoaded: true,
          items: results
        }); 
    }).catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
    });
  
  }  

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div className="error">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <div className="weather-app">
            <Header />
            <main>
              <div className="container"> 
                <div className="row">
                  {items.map(function(i){
                    return <WeatherList key={i.id} temp={i.main.temp} name={i.name} weather={i.weather[0].description} icon={i.weather[0].icon} wind={i.wind.speed} sunrise={i.sys.sunrise} sunset={i.sys.sunset} owmid={i.id} />;
                  })}
                </div>
              </div>
            </main>
            <Footer />
        </div>
      );
    }  
  }
}

export default App;
