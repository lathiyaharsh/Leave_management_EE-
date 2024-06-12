"use client"
import React from 'react'
import Cookies from "js-cookie";

const getToken = () => {
    const token = Cookies.get('jwt');
    console.log("fhgsadufsog",token);
    return token;
}

export default getToken;