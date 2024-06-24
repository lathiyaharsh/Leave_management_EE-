import apiClient from './apiClient'; // Adjust the import path as needed

export const getApiCall = async (url: string) => {
  try {
    const res: any = await apiClient.get(url);
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const postApiCallWithImage = async (url: string, data: any) => {
  try {
    const res: any = await apiClient.post(url, data, {
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
    const res: any = await apiClient.post(url, data);
    return res;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const putApiCall = async (url: string, data: any) => {
  try {
    const res: any = await apiClient.put(url, data, {
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
