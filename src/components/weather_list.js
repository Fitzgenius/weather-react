import React from "react";
//import axios from 'axios';

const ApiKey = "873b444dfc0c64bcdce325bd495a21bf";

class WeatherList extends React.Component{ 

    constructor(props) {

        super(props);

        this.state = {
            isHidden: true,
            sealevels: [] 
        }

        this.getSeaLevels = this.getSeaLevels.bind(this);
    
    }

    formatDate = (timestamp) => {
        var time = new Date(timestamp*1000);
        // Hours part from the timestamp
        var hours = time.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + time.getMinutes();
        // Seconds part from the timestamp
        //var seconds = "0" + time.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    getSeaLevels = () => {
 
        let api_url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&id="+this.props.owmid+"&appid="+ApiKey;
        let sealevels = [];

        fetch(api_url)
          .then((resp) => {
            return resp.json()
          }) 
          .then((data) => {

            // push to sealevels
            let keys = [4, 12, 20, 28, 36];
            keys.forEach(n => {
                sealevels.push(data.list[n].main.sea_level.toFixed(0));
            });            
            //console.log(data);
            this.setState({ 
                sealevels: sealevels,
                isHidden: !this.state.isHidden
            })                    
          })
          .catch((error) => {
            console.log(error, "Bad times")
        });

        //console.log(sealevels);

    }

    render(){

        const icon_url = "http://openweathermap.org/img/w/"+this.props.icon+".png";
        const sunrise = this.formatDate(this.props.sunrise); ;
        const sunset = this.formatDate( this.props.sunset);

        const seaLevelListItems = this.state.sealevels.map((n, k) =>
            <li key={k}><span>Day {k+1}</span> {n}hPa</li>
        );        

        return(
        <div className="col-4">
            <div className="weather-city animated fadeIn">
                <h2>{this.props.name}</h2>
                <span className="temperature">{this.props.temp.toFixed(0)}&deg;</span>
                <img src={icon_url} alt={this.props.weather} />       
                <span className="desc">{this.props.weather}</span>          
                <div className="details">                                     
                    <span className="wind_speed"><i className="fas fa-wind"></i> {this.props.wind.toFixed(0)}mph</span>
                    <span className="sunrise"><i className="fas fa-sun"></i><i className="fas fa-arrow-up"></i>  {sunrise}</span>
                    <span className="sunset"><i className="fas fa-sun"></i><i className="fas fa-arrow-down"></i>  {sunset}</span>
                </div>

                {!this.state.isHidden && 
                <ul className="sea_levels animated fadeIn">
                <li className="title">Sea levels @ 9am for the next 5 days</li>
                    {seaLevelListItems}
                </ul>
                }

                <button onClick={this.getSeaLevels}>Sea Levels</button>
            </div>
        </div>
        )
    }
}

export default WeatherList;