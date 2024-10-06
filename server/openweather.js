
api_key = "49b7e58ca783f0a1caa247ae6ec60e6f"

// Return Weather Data given coordinates
async function getCoordinateWeather(lat, lon, api_key) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

lat = 49.2827
lon = -123.1207
getCoordinateWeather(lat, lon, api_key)
