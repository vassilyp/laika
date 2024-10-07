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

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://localhost:3000/api/story");
            const data = response.json();
            return data;
        }
        // const data = getData();
        const data = TEST_DATA;
        setLocationData(data);
        setLoading(false);

    }, [location])

    return [locationData, loading, error]
}
