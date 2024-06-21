import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
axios.defaults.withCredentials = true;
export const getApiCall = async (url: string) => {
  try {
    const res: any = await axios.get(`${baseUrl + url}`);
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};
export const postApiCallWithImage = async (url: string, data: any) => {
  try {
    const res: any = await axios.post(`${baseUrl + url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const postApiCall = async (url: string, data: any) => {
  try {
    const res: any = await axios.post(`${baseUrl + url}`, data);
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};
export const putApiCall = async (url: string, data: any) => {
  try {
    const res: any = await axios.put(`${baseUrl + url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};
