import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const fetchUser = async () => {
  try {
    let url = "/user/profile";

    const userProfile = await axios.get(`${baseUrl + url}`, {
      withCredentials: true,
    });

    if (userProfile?.data?.profile) {
      return userProfile?.data?.profile;
    } else {
      return "guest";
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fetchUser;
