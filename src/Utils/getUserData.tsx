
// import axios from "axios";
// import useLogin from "./useLogin";
// import handleUnauthorized from "./handleUnauthorized";
// import { errorMonitor } from "stream";

// const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
// const FetchUser = async (role : string) => {
//   try {
//     console.log(role);
    
//     let url;
//       if(role === 'student') {
//          url ='/user/profile';
//       }else{
//          url ='/manage/profile';
//       }

//       await axios.get(`${baseUrl + url}`, { withCredentials: true })
//       .then( (response) =>{
//         console.log(response);
//         if(response.data.profile){
//           return response.data.profile;
//         }else{
//           return false;
//         }
//       }).catch((err) =>{
//         console.log(err);
//       })
    
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
//   };


//   export default FetchUser;