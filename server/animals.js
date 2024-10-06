
api_key = "49b7e58ca783f0a1caa247ae6ec60e6f";

// These are hardcoded, they need to be retrieved from the user clicking on the map
lat = 49
lon = -123

// These are hardcoded but will be set permanantly
start = 1369728000
end = 1369789200
radius = 1000


// Return Weather Data given coordinates
async function getCoordinateWeather(lat, lon, radius) {
    // TODO: May want to add params to filter out bacteria, etc
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
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

getCoordinateWeather(lat, lon, radius);
