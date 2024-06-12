"use client";
import axios from "axios";
import Cookies from "js-cookie";
import getToken from "./getToken";

const baseUrl  = process.env.NEXT_PUBLIC_BASEURL;

const fetchUser = async () => {
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
    return false;
  }
};

export default fetchUser;
