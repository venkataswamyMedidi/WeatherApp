import React, { useEffect, useState } from "react";
// import Form from "../form/form";
// import Titles from "../form/titles";
// import Weather from "../weatherFinder/weather";
// import LoadingSpinner from "../spinnner/LoadingSpinner";
import { GetWeatherDetails, GetForecastWeatherDetails } from '../../redux/Action'
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import moment from "moment";
import "./styles.css";

// const Api_Key = "fe4feefa8543e06d4f3c66d92c61b69c";
//const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=metric`;
//const apiUrl = "https://jsonplaceholder.typicode.com/posts"

// const dateBuilder = (d) => {
//     let months = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//     ];
//     let days = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//     ];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`;
// };


// const ReduxApp = () => {
//     const dispatch = useDispatch();
//     const [weather, setWeather] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     //WeatherReducer
//     const contextData = useSelector((state) => state.Weather);
//     console.log("contextData", contextData)

//     const fetchAction = (location) => {
//         dispatch(GetWeatherDetails(location))
//     }
//     console.log("fetchAction", fetchAction())
//     //const showSpinnerSpecialty = useSelector((state) => state.specialtySalesData.spinnerSpecialty, shallowEqual);
//     // const [errorMessage, setErrorMessage] = useState("");

//     // useEffect(() => {
//     //     fetch(apiUrl)
//     //         .then((res) => res.json())
//     //         .then((data) => setApiData(data));
//     // }, []);

//     async function fetchData(e) {
//         const city = e.target.elements.city.value;
//         const country = e.target.elements.country.value;
//         e.preventDefault();
//         const apiData = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&limit=4&appid=${Api_Key}&units=metric`
//         )
//             .then((res) => res.json())
//             .then((data) => data);
//         setIsLoading(true);
//         if (city && country) {
//             setIsLoading(true);
//             // Optional code to simulate delay
//             // setTimeout(() => {
//             //     setWeather(apiData);
//             //     setIsLoading(false);

//             // }, 15000);

//             setWeather({
//                 data: apiData,
//                 city: apiData.name,
//                 country: apiData.sys.country,
//                 description: apiData.weather[0].description,
//                 temperature: apiData.main.temp,
//                 humidity: apiData.main.humidity,
//                 icon: `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`,
//                 error: "",
//             });
//         } else {
//             // setLoading(false);
//             setIsLoading(true);
//             setWeather({
//                 data: "",
//                 city: "",
//                 country: "",
//                 description: "",
//                 temperature: "",
//                 error: "Please Type A City And Country",
//             })
//         }
//     }

//     return (
//         <div className="App">
//             <div className="wrapper">
//                 <div className="main">
//                     <div className="container">
//                         <div className="row">
//                             <div className="title-container">
//                                 <Titles />
//                             </div>
//                             <div className="date">Paris, France</div>
//                             <div className="date">{dateBuilder(new Date())}</div>
//                             {/* {loading ? <>Loading..</> : <>Search</>} */}
//                             {/* {fetchData && loading ? ( */}
//                             <div className="form-container">
//                                 <Form loadWeather={fetchAction()} />
//                                 {console.log("form", weather.data)}
//                                 {/* {console.log("country", weather.sys.country)} */}

//                                 {isLoading ? (
//                                     <Weather
//                                         temperature={weather.temperature || null}
//                                         city={weather.city || null}
//                                         country={weather.country || null}
//                                         humidity={weather.humidity || null}
//                                         description={weather.description || null}
//                                         icon={weather.icon || null}
//                                         error={weather.error || null}
//                                     />
//                                 ) : (
//                                         <LoadingSpinner />
//                                     )
//                                 }
//                             </div>
//                             {/* ) : (
//                                     <h1>Loading</h1>
//                                 )} */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const ReduxApp = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [weather2, setWeather2] = useState([]);
    const search = async (e) => {
        if (e.key === "Enter") {
            const data = await GetWeatherDetails(query);
            setWeather(data);
            // checkTime(data);
            forecast();
            setQuery("");
        }
    };

    function checkTime(weather) {
        // const sunrise = weather.target.elements.sys.sunrise;
        // const sunset = weather.target.elements.country.value;
        let time = weather;
        let sunrise = time.sys.sunrise;
        let sunset = time.sys.sunset;
        console.log("sunrise", JSON.stringify(sunrise));
        if (
            moment.unix(sunrise).format("HHMM") < moment(new Date()).format("HHMM") &&
            moment(new Date()).format("HHMM") < moment.unix(sunset).format("HHMM")
        ) {
            document.querySelector(".main-container").classList.remove('sunset');
            document.querySelector(".main-container").classList.add('sunrise');
        } else {
            document.querySelector(".main-container").classList.remove('sunrise');
            document.querySelector(".main-container").classList.add('sunset')
        }
    }

    const forecast = async (e) => {
        const data = await GetForecastWeatherDetails(query);
        const forecastData = [];

        for (let i = 0; i < data.list.length; i += 8) {
            let temp = [];
            let dt = new Date(data.list[i + 5].dt_txt);
            temp.push(dt.getDate() + "/" + dt.getFullYear());
            temp.push(data.list[i].weather[0].main);
            temp.push(data.list[i + 3].weather[0].description);
            temp.push(
                `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
            );
            temp.push(data.list[i].main.temp);
            forecastData.push(temp);
        }
        setWeather2(forecastData);
    };
    console.log("weather2", weather2);
    const Foredata = weather2.map((item, i) => {
        return (
            <div className="forecast">
                <div key={i} className="date">
                    {item[0]}
                </div>
                <div key={i}>{item[1]}</div>
                <div key={i}>
                    {item[4]} <sup>&deg;C</sup>
                </div>
                <div key={i}>
                    <img className="forecast-img" src={item[3]} />
                </div>
            </div>
        );
    });

    return (
        <div className="main-container">
            <h1>Weather App</h1>
            <input
                placeholder="Enter City..."
                type="text"
                className="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                        <p>{moment().format("LT")}</p>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img
                            className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            {weather2.length > 0 ? <div className="container">{Foredata}</div> : null}
        </div>
    );
};
export default ReduxApp;
