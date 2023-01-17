import React, { useEffect, useState } from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import Weather from "../weatherFinder/weather";

export const API_KEY = "fe4feefa8543e06d4f3c66d92c61b69c";
export const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

const CitySelector = () => {
    const [city, setCity] = useState("");
    const [results, setResults] = useState(null);

    // const onSearch = () => {
    //     fetch(
    //         //   `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    //         `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    //     )
    //         .then((response) => response.json())
    //         // .then((result) => console.log(result));
    //         .then((results) => setResults(results));
    // };

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            onSearch();
        }
    };

    async function onSearch(e) {
        //const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;
        e.preventDefault();
        const apiData = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )
            .then((res) => res.json())
            .then((data) => data);
        setResults({
            data: apiData,
            city: apiData.name,
            country: apiData.country,
            // description: apiData.weather[0].description,
            // temperature: apiData.main.temp,
            // humidity: apiData.main.humidity,
            // icon: `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`,
            error: "",
        });
    }

    return (
        <div className="city">
            <Grid columns={3} divided>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h1>Search your city</h1>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {/* xs={4} takes the one third  of the page*/}
                    <Grid.Column>
                        {/* <Form
                        placeholder="Enter city"
                        // update city value with the user's input
                        onChange={(event) => setCity(event.target.value)}
                        // value will be the currently selected city
                        value={city}
                    /> */}
                        <Form.Field>
                            <label>CITY</label>
                            <input
                                placeholder="Enter city"
                                onChange={(event) => setCity(event.target.value)}
                                value={city}
                                onKeyDown={onKeyDown}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {/* event handler for button click */}
                        <Button onClick={onSearch}>Check Weather</Button>
                    </Grid.Column>
                </Grid.Row>
                {/* <Weather
                    temperature={city.temperature || null}
                    city={city.city || null}
                    country={city.country || null}
                // humidity={city.humidity || null}
                // description={city.description || null}
                // icon={city.icon || null}
                // error={city.error || null}
                /> */}
                {/* {city.main ? (
                    <div>
                        <p className="h5">
                            <i className="fas fa-map-marker-alt"></i>{' '}
                            <strong>{city.name}</strong>
                        </p>
                    </div>
                ) : (
                        <h1>Loading:
                            <strong>{city.name}</strong></h1>
                    )} */}
                {/* return (
        <ul>
                    {results((name) => (
                        <li >{results.name}</li>
                    ))}
                </ul>
        ); */}
            </Grid>
            {/* {results ? (
                <div>
                    <p className="h5">
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        <strong>{city.name}</strong>
                    </p>
                </div>
            ) : (
                    <h1>Loading:
                        <strong>{city.name}</strong></h1>
                )} */}
                {
                    results.map(()=>{
                        <div>
                            <p className="h5">
                                <i className="fas fa-map-marker-alt"></i>{' '}
                                <strong>{city.name}</strong>
                            </p>
                        </div>
                    })
                }
            <div>

            </div>
        </div>
    );
};

export default CitySelector;
