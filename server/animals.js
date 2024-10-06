import SECRET from "./secret.json" with { type: "json" };

let api_key = SECRET.api_key

// These need to be retrieved from the user clicking on the map
let lat = 49
let lon = -123

// These are hardcoded but will be set permanantly
const start = 1369728000
const end = 1369789200
const radius = 1000 // TODO: this might need to be tweaked


async function getCoordinateAnimals(lat, lon, radius) {
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

        return animaliaResults
    } catch (error) {
        console.error(error.message);
    }
}

getCoordinateAnimals(lat, lon, radius);
