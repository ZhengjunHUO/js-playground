import { useState, useCallback } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHandler = useCallback(async (config, handleData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(config.url, config.option);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      handleData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    fetchHandler,
  };
};
