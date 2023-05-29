import axios, { AxiosError, AxiosResponse } from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const login = async (data: object): Promise<AxiosResponse> => {
  try {
    const res = await axios.post("/user/login/", data, {});
    return res;
  } catch (error) {
    throw error as AxiosError;
  }
};
