import { useCallback, useEffect, useState } from "react";

export const useFacts = () => {
    const [factOfTheDay, setFactOfTheDay] = useState(null);
    const [randomFacts, setRandomFacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const factAPIKey = import.meta.env.VITE_FACT_NINJA_API_KEY;

    const fetchFactOfTheDay = useCallback(async () => {
        try {
            const [factOfTheDayRes, fiveRandomFactsRes] = await Promise.all([
                fetch('https://api.api-ninjas.com/v1/factoftheday', {
                    method: "GET",
                    headers: {
                        "X-Api-Key": factAPIKey,
                    }
                }),
                fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
                    method: "GET",
                    headers: {
                        "X-Api-Key": factAPIKey,
                    }
                })
            ]);
            const factOfTheDayData = await factOfTheDayRes.json();
            const fiveRandomFactsData = await fiveRandomFactsRes.json();

            setFactOfTheDay(factOfTheDayData);
            setRandomFacts(fiveRandomFactsData);
        } catch(err) {
            setError(err)
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchFactOfTheDay();
    }, [fetchFactOfTheDay])

    return { error, factOfTheDay, loading, randomFacts  };
}
