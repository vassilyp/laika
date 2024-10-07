import { useEffect, useState } from "react"

export default function useLocationData(location) {
    const [locationData, setLocationData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            if (location) {
              const lat = location[0].toFixed(2)
              const lon = location[1].toFixed(2)
              const response = await fetch(`/api/story/${lat},${lon}`);
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
