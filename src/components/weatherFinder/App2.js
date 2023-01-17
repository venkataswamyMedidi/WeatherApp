import React, { useState } from "react";
import Form from "../form/form";
import Titles from "../form/titles";
// import Titles from "./components/titles";
import Weather from "./weather";
// import Form from "./components/form";
import LoadingSpinner from "../spinnner/LoadingSpinner";

const Api_Key = "fe4feefa8543e06d4f3c66d92c61b69c";
//const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=metric`;
//const apiUrl = "https://jsonplaceholder.typicode.com/posts"

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
// const imgURL = `owf owf-${reading.weather[0].id} owf-5x

const App2 = () => {
    const [weather, setWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     fetch(apiUrl)
    //         .then((res) => res.json())
    //         .then((data) => setApiData(data));
    // }, []);

    async function fetchData(e) {
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        e.preventDefault();
        const apiData = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&limit=4&appid=${Api_Key}&units=metric`
        )
            .then((res) => res.json())
            .then((data) => data);
        setIsLoading(true);
        if (city && country) {
            setIsLoading(true);
            // Optional code to simulate delay
            setTimeout(() => {
                setWeather(apiData);
                setIsLoading(false);

            }, 15000);

            setWeather({
                data: apiData,
                city: apiData.name,
                country: apiData.sys.country,
                description: apiData.weather[0].description,
                temperature: apiData.main.temp,
                humidity: apiData.main.humidity,
                // icon: `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`,
                icon: `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`,
                error: "",
            });
        } else {
            // setLoading(false);
            setIsLoading(true);
            setWeather({
                data: "",
                city: "",
                country: "",
                description: "",
                temperature: "",
                error: "Please Type A City And Country",
            })
        }
    }

    return (
        <div className="App">
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="title-container">
                                <Titles />
                            </div>
                            <div className="date">Paris, France</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                            {/* {loading ? <>Loading..</> : <>Search</>} */}
                            {/* {fetchData && loading ? ( */}
                            <div className="form-container">
                                <Form loadWeather={fetchData} />
                                {console.log("form", weather.data)}
                                {/* {console.log("country", weather.sys.country)} */}

                                {isLoading ? (
                                    <Weather
                                        temperature={weather.temperature || null}
                                        city={weather.city || null}
                                        country={weather.country || null}
                                        humidity={weather.humidity || null}
                                        description={weather.description || null}
                                        icon={weather.icon}
                                        error={weather.error || null}
                                    />
                                ) : (
                                        <LoadingSpinner />
                                    )
                                }
                            </div>
                            {/* ) : (
                                    <h1>Loading</h1>
                                )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default App2;
