
import axios from "axios";

export const UserFetcher = async () => {
  try {
    let url = "/user/profile";

    const userProfile = await axios.get(`${baseUrl + url}`, {
      withCredentials: true,
    });

    if (userProfile?.data?.profile) {
      return userProfile?.data?.profile;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
