
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

        const kingdom = animaliaResults[0].kingdom
        const family = animaliaResults[0].family
        const genus = animaliaResults[0].genus
        const species = animaliaResults[0].species

        console.log("kingdom: " + kingdom + "\nfamily: " + family + "\ngenus: " + genus + "\nspecies: " + species)

        return [kingdom, family, genus, species]

    } catch (error) {
        console.error(error.message);
    }
}

// getCoordinateAnimals(lat, lon, radius);