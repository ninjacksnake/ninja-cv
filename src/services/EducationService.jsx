import axios from "axios";
import Config from "../Config";

const apiUrl = Config.ApiUrl;
//console.log("🚀 ~ file: ProfileService.jsx:7 ~ apiUrl:", apiUrl)

const EducationService = {
  find: async function ({ token, loggedUser }) {
    try {
      const result = await axios.get(
        `${apiUrl}/education/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    // console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },

  
  create: async (createInfo, loggedUser, token) => {
    // console.log("🚀 ~ file: EducationService.jsx:27 ~ create: ~ createInfo:", createInfo)
    
    try {
      const profileInfo = await axios.post(
        `${apiUrl}/education/`, createInfo, { headers:{ 
          Authorization: token,
        }}) 
  
      return profileInfo;
    } catch (error) {
      console.log(error)
    }
  },

  update: async (userId, token, updateInfo) => {
    try {
      const educationInfo = await axios.put(
        `${apiUrl}/education/${userId}`, updateInfo, { headers:{ 
          Authorization: token,
        }}) 
  
      return educationInfo;
    } catch (error) {
      console.log(error)
    }
  },

  remove: async (profiileId, loggedUser, token) => {
    try {
      const educationInfo = await axios.delete(`${apiUrl}/education/${profiileId}/`, {headers:{
        Authorization: token,
      }});
      return educationInfo; 
    } catch (error) {
      console.log(error)
    }
  },
};

export default EducationService;
