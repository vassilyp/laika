
// These are hardcoded but will be set permanantly
const start = 1369728000
const end = 1369789200

export async function getCoordinateAnimals(lat, lon, radius) {
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

        return animaliaResults
    } catch (error) {
        console.error(error.message);
    }
}

export default getCoordinateAnimals
