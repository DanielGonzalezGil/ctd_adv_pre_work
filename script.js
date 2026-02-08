//TODO:
    // Figure out how to get location dynamically (currently hard coded to chapel hill nc)
    // add event listeners for buttons 
    // fetch data from the air quality api end point



const getForecastData = async ()=> {
    //forecast endpoint
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.9132&longitude=-79.0558&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch';
    const response = await fetch(url);
    return await response.json();

};

const renderForecastData = (forecastData) => {
    //accessing the 'daily' property from the api
    const {time, temperature_2m_max,temperature_2m_min} = forecastData.daily;

    //mapping through 'time' array and using the index to match it with its corresponding temp
    return time.map((date, index) => {
        return `<li>${date}: Max of ${temperature_2m_max[index]}°F, low of ${temperature_2m_min[index]}°F</li>`
    }).join('');
};

(async() => {

    try {
    // Get forecast data
    const forecastData = await getForecastData();

    //show the forecast data
    const container = document.querySelector('#forecast-result');
    if(container){
        container.innerHTML = `<ul>${renderForecastData(forecastData)}</ul>`;
    }
    }catch (err) {
        console.log(err);
        //document.querySelector('#message').textContent = err.message;
    }

})();