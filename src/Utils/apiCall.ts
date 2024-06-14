import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
export const getApiCall = async (url: string) => {
  try {
    const res: any = await axios.get(`${baseUrl + url}`, {
      withCredentials: true,
    });
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
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const postApiCall = async (url: string, data: any) => {
  try {
    const res: any = await axios.post(`${baseUrl + url}`, data, {
      withCredentials: true,
    });
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
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};
