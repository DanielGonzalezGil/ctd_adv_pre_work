
const getForecastData = async (longitude,latitude) => {
    //forecast endpoint
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
    const response = await fetch(url);
    return await response.json();

};


const getTerrainElevationData = async (longitude,latitude) => {
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`;
    const response = await fetch(url);
    return await response.json();
}

const renderForecastData = (forecastData) => {
    //accessing the 'daily' property from the api
    const {time, temperature_2m_max,temperature_2m_min} = forecastData.daily;
    //mapping through 'time' array and using the index to match it with its corresponding temp
    return time.map((date, index) => {
        return `<li>${date}: Max of ${temperature_2m_max[index]}°F, Low of ${temperature_2m_min[index]}°F</li>`
    }).join('');
};

const renderTerrainElevationData = (terrainElevationData) => {
    //Accessing the actual array from the API response
    const elevations = terrainElevationData.elevation;
    //Map over that array directly
    return elevations.map((value) => `<li>${value} Meters</li>`).join('');
};


(async() => {
    try {

    //selecting the buttons foreach API endpoint
    const weatherForecastBtn = document.getElementById("7-day-forecast-bt");
    const elevationBtn = document.getElementById("terrain-elevation-bt");
    //selecting the html div where the result will be displayed
    const container = document.querySelector('#forecast-result');

    //Event Listerners for each button  weatherForecastBtn.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords;
            const data = await getForecastData(longitude, latitude);
            container.innerHTML = `<ul>${renderForecastData(data)}</ul>`;
        });
    })

    elevationBtn.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(async(position) => {
            const {latitude, longitude} = position.coords;
            const locationData = await getTerrainElevationData(longitude, latitude);
            container.innerHTML = `<ul>${renderTerrainElevationData(locationData)}</ul>`;
        });   
    });    

    }
    catch (err) {
        document.querySelector('#message').textContent = err.message;
    }
})();