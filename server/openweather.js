
// Return Weather Data given coordinates
export async function getCoordinateWeather(lat, lon) {

    let api_key = process.env.OPENWEATHER_API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json

    } catch (error) {
        console.error(error.message);
    }
}

export default getCoordinateWeather
