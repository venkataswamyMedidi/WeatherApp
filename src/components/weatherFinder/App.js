import React from "react";
import Weather from "./weather";
import Form from "../form/form";
// import SWeather from "./components/stateless_weather";
// import SForm from "./components/stateless_form"
import Titles from "../form/titles";
// import Test from './Test'
import LoadingSpinner from '../spinnner/LoadingSpinner'

// const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";
const Api_Key = "fe4feefa8543e06d4f3c66d92c61b69c";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const codeMapping = {
  "01d": "clear-sky-day",
  "01n": "clear-sky-night",
  "02d": "cloudy-day",
  "02n": "cloudy-night",
  "03d": "cloudy-day",
  "03n": "cloudy-night",
  "04d": "cloudy-day",
  "04n": "cloudy-night",
  "09d": "shower-rain-day",
  "09n": "shower-rain-night",
  "10d": "rain-day",
  "10n": "rain-night",
  "11d": "thunderstorm-day",
  "11n": "thunderstorm-night",
  "13d": "snow-day",
  "13n": "snow-night",
  "50d": "fog-day",
  "50n": "fog-night",
};
// let name = codeMapping[props.code];

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined,
  };

  //getWeather is a method we'll use to make the api call
  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=metric`
    );
    const response = await api_call.json();
    console.log(response);
    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
        error: "",
      });
    } else {
      this.setState({
        error: "Please input search values...",
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="title-container">
                  <Titles />
                </div>
                <div className="date">Paris, France</div>
                <div className="date">{dateBuilder(new Date())}</div>
                {/* <div className="date"> {new Date().toDateString("en-US")}</div> */}
                <div className="form-container">
                  <Form loadWeather={this.getWeather} />
                  {/* <div class="card-body text-center">
                    <img
                      src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                      alt="weather status icon"
                      className="weather-icon"
                    />
                  </div> */}

                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    icon={this.state.icon}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
            <footer className="footer">
              <code>
                Created by{" "}
                <a href="" target="none">
                  WeatherTeam
                </a>{" "}
                using React
              </code>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
