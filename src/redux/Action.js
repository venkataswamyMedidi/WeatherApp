import { GET_WEATHER } from "./Constant";
import axios from "axios";
import { BASE_URL, BASE2_URL } from "../components/redux_weatherFinder/ApiConstants";
// import { toast } from "react-toastify";

export const GetWeatherDetails = (query) => async (dispatch) => {
    // dispatch({ type: GET_WEATHER.PENDING });

    axios
        .get(BASE_URL, {
            params: {
                q: query,
                units: "Metric",
                lang: "en",
            },
        })
        .then((response) => {
            //dispatch({ type: GET_WEATHER.SUCCESS, payload: response.data });
            console.log("responseWeather", response);
        })
        .catch((err) => {
            console.log(err.response, err);
            // toast.error(err.response.data.message, {
            //     position: "bottom-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: false,
            // });
            // dispatch({ type: GET_WEATHER.REJECTED, payload: err.response });
        });

};

export const GetForecastWeatherDetails = (query) => async (dispatch) => {
    // dispatch({ type: GET_WEATHER.PENDING });

    axios
        .get(BASE2_URL, {
            params: {
                q: query,
                units: "Metric",
                lang: "en",
            },
        })
        .then((response) => {
            //dispatch({ type: GET_WEATHER.SUCCESS, payload: response.data });
            console.log("responseForecast", response);
        })
        .catch((err) => {
            console.log(err.response, err);
            console.log(err.response, "errforecast");
            // toast.error(err.response.data.message, {
            //     position: "bottom-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: false,
            // });
            //dispatch({ type: GET_WEATHER.REJECTED, payload: err.response });
        });

};
