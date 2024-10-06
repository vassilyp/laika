
api_key = "49b7e58ca783f0a1caa247ae6ec60e6f";

// These are hardcoded, they need to be retrieved from the user clicking on the map
lat = 49
lon = -123

// These are hardcoded but will be set permanantly
start = 1369728000
end = 1369789200
radius = 1000 // this might need to be tweaked


// Return Weather Data given coordinates
async function getCoordinateWeather(lat, lon, radius) {
    const url = `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${lat}&decimalLongitude=${lon}&radius=${radius}&limit=5`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        // filters only animalia results
        const animaliaResults = json.results.filter(result => result.kingdom === 'Animalia');
        console.log(animaliaResults);
    } catch (error) {
        console.error(error.message);
    }
}

getCoordinateWeather(lat, lon, radius);
