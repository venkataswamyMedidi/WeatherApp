import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
// import App from './components/weatherFinder/App';
import registerServiceWorker from './registerServiceWorker';
import App2 from './components/weatherFinder/App2';
import { Provider } from "react-redux";
import WeatherStore from "./redux/Store";
// import ReduxApp from './components/redux_weatherFinder/reduxApp';
// import CitySelector from './components/redux_weatherFinder/CitySelector'
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={WeatherStore}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<App2 />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

registerServiceWorker();

//https://dev.to/hulyakarakaya/create-a-weather-app-with-react-hooks-part-1-4055