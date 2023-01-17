import React from "react";

const Weather = (props) => {

    return (
        <div className="weather-info">
            {props.country && props.city && (
                <p className="weather__key">
                    Location:
                    <span className="weather__value">
                        {" "}
                        {props.city}, {props.country}
                    </span>
                </p>
            )}

            {props.temperature && (
                <p className="weather__key">
                    Temperature:
                    <span className="weather__value">
                        {" "}
                        {Math.round((props.temperature * 9) / 5 + 32)}°F
          </span>
                </p>
            )}

            {props.humidity && (
                <p className="weather__key">
                    Humidity:
                    <span className="weather__value"> {props.humidity}</span>
                </p>
            )}

            {/* {props.date && (
                <p className="weather__key">
                    dt:
                    <span className="weather__value"> {date.toLocaleDateString()} - {date.toLocaleTimeString()}</span>
                </p>
            )} */}

            {props.description && (
                <p className="weather__key">
                    Conditions:
                    <span className="weather__value"> {props.description}</span>
                </p>
            )}

            {props.icon && (
                <p className="weather__key">
                    icon:
                    {/* <span className="weather__value"> { props.icon}</span> */}
                    <img
                        src={props.icon}
                        alt="weather status icon"
                        // alt="img from unsplash"
                        className="weather__Iconkey"
                    />
                </p>
            )}
            {props.error && <p className="weather__error">{props.error}</p>}
        </div>
    );
};

export default Weather;
