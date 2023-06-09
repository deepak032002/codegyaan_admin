import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

type ApiResponse<T> = {
  data: T | null;
  error: AxiosError | null;
  isLoading: boolean;
};

export function useCall<T>(
  url: string,
  method: string,
  headers: AxiosHeaders
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<T> = await axios(url, {
          method: method,
          headers: headers,
        });
        if (isMounted) {
          setData(response as T);
          setError(null);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        if (isMounted) {
          setError(axiosError);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, isLoading };
}

export function useCallOnEvent<T>(
  url: string,
  method: string,
  headers?: AxiosRequestHeaders
): [ApiResponse<T>, (data: object) => void] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (data: object) => {
    setIsLoading(true);
    setData(null);
    try {
      const response: AxiosResponse<T> = await axios(url, {
        data: data,
        method: method,
        headers: headers,
      });
      setData(response as T);
      setError(null);
    } catch (err) {
      const axiosError = err;
      setError(axiosError as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return [{ data, error, isLoading }, fetchData];
}
