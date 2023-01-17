import React, { useState, useEffect } from "react";
// import Weather from "./components/weather";
// import Form from "./components/form";
// import Titles from "./components/titles";

// const Api_Key = "fe4feefa8543e06d4f3c66d92c61b69c"

function AppModel2() {
    const [weather, setWeather] = useState({});
    const [locations, setLocations] = useState("london");
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        ifClicked();
    }, []);

    function ifClicked() {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID={APP_ID}&units=metric`
        )
            .then((res) => {
                if (res.ok) {
                    console.log(res.status);
                    return res.json();
                } else {
                    if (res.status === 404) {
                        return alert("Oops, there seems to be an error!(wrong location)");
                    }
                    alert("Oops, there seems to be an error!");
                    throw new Error("You have an error");
                }
            })
            .then((object) => {
                setWeather(object);
                console.log(weather);
            })
            .catch((error) => console.log(error));
        fetch(
            `https://api.unsplash.com/search/photos?query=${locations}&client_id={APP_ID}`
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("You made a mistake");
                }
            })
            .then((data) => {
                console.log(data);
                setPhotos(data.results[0].urls.raw);
            })
            .catch((error) => console.log(error));
    }
    return (
        <div className="app">
            <div className="wrapper">
                <div className="search">
                    <input
                        type="text"
                        value={locations}
                        onChange={(e) => setLocations(e.target.value)}
                        placeholder="Enter location"
                        className="location_input"
                    />
                    <button className="location_searcher" onClick={ifClicked}>
                        Search Location
          </button>
                </div>
                <div className="app__data">
                    <p className="temp">Current Temparature: {weather.main.temp}</p>
                </div>
                <img className="app__image" src={photos} alt="" />
            </div>
        </div>
    );
}

export default AppModel2