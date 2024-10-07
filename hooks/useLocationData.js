import { useEffect, useState } from "react"

export default function useLocationData(location) {
    const [locationData, setLocationData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const TEST_DATA = {
        name: "Vancouver BC, Canada",
        story: "Somewhere, in a UBC cafeteria, 5 software developers are slowly going crazy one javascript runtime error at a time. Vassily said this would be chill. It was not chill.\n\nWith a cumulative 5 redbulls, 6 coffees, and 12 mini-donuts consumed between them, the combined IQ of the group is rapidly dropping. It is not clear if they will make it to the end of the day, much less the weekend.",
        audioURL: "audio.com"
    };

    useEffect( () => {
        const getData =
         async () => {
            if (location) {
              const lat = location[0].toFixed(2)
              const lon = location[1].toFixed(2)
              const response = await fetch(`http://localhost:3000/api/story/${lat},${lon}`);
              const data = await response.json();
              console.log(data)
              setLocationData(data);
              setLoading(false);
            }
        }

        getData()
    }, [location])

    return [locationData, loading, error]
}
