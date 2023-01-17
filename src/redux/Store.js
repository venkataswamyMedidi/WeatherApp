import { createStore, applyMiddleware } from "redux";
import { WeatherReducer } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const WeatherStore = createStore(
    WeatherReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export default WeatherStore;
