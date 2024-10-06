import { createServer } from 'http';
import fetch from 'node-fetch'; 

const port = 3000;

// TODO: make them unique and mammals (set), sort by weight

// Coordinates and other parameters
const api_key = "49b7e58ca783f0a1caa247ae6ec60e6f";
const lat = 49;
const lon = -123;
const start = 1369728000;
const end = 1369789200;
const radius = 10000;

// Function to get weather data based on coordinates
async function getCoordinateWeather(lat, lon, radius) {
    const url = `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${lat}&decimalLongitude=${lon}&radius=${radius}&limit=5`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        
        const json = await response.json();

        // only animalia results (and change to mammals)
        // TODO: make this a set
        const animaliaResults = json.results.filter(result => result.kingdom === 'Animalia');
        return animaliaResults; 
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

// Create HTTP server
const server = createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html'); // Set content type to HTML

    if (req.url === '/') {
        // Fetch the weather data
        const animaliaResults = await getCoordinateWeather(lat, lon, radius);

        // Create HTML response to display the results
        let html = `<h1>Hello World!</h1>`;
        html += `<h2>Animalia Results:</h2><ul>`;

        // Display results
        animaliaResults.forEach(result => {
            html += `<li>Species: ${result.species} - Location: ${result.decimalLatitude}, ${result.decimalLongitude}</li>`;
        });

        html += `</ul>`;

        // Send the HTML response
        res.end(html);
    } else {
        res.end('<h1>404 Not Found</h1>');
    }
});

// Start server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
