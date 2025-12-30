import { useState, useEffect } from 'react';

// Primary API: Loteriascaixa.com (unofficial but reliable)
const API_URL = 'https://loteriascaixa.com/api/mega-sena/';
// Fallback API: Caixa official (with CORS proxy)
const FALLBACK_API_URL = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/';
const CORS_PROXY = 'https://corsproxy.io/?';

const CACHE_KEY = 'megasena_data';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export function useLotteryData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Check cache first
    if (!forceRefresh) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setData(cachedData);
            setLastUpdate(new Date(timestamp));
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error parsing cached data:', err);
          localStorage.removeItem(CACHE_KEY);
        }
      }
    }

    // Try primary API first
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const apiData = await response.json();

      // Validate data
      if (!Array.isArray(apiData) || apiData.length === 0) {
        throw new Error('Invalid API response format');
      }

      // Cache the data
      const cacheData = {
        data: apiData,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setData(apiData);
      setLastUpdate(new Date());
      setError(null);
    } catch (primaryError) {
      console.warn('Primary API failed:', primaryError.message);

      // Try fallback API with CORS proxy
      try {
        const fallbackUrl = CORS_PROXY + encodeURIComponent(FALLBACK_API_URL);
        const response = await fetch(fallbackUrl);

        if (!response.ok) {
          throw new Error(`Fallback API returned ${response.status}`);
        }

        const apiData = await response.json();

        // Cache the fallback data
        const cacheData = {
          data: apiData,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setData(apiData);
        setLastUpdate(new Date());
        setError(null);
      } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError.message);

        // Try to use old cache as last resort
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { data: cachedData, timestamp } = JSON.parse(cached);
            setData(cachedData);
            setLastUpdate(new Date(timestamp));
            setError('Usando dados em cache. Última atualização pode estar desatualizada.');
          } catch {
            setError('Falha ao carregar dados. Tente novamente mais tarde.');
          }
        } else {
          setError('Falha ao carregar dados. Tente novamente mais tarde.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh: () => fetchData(true)
  };
}
