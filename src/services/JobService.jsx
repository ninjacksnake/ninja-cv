import axios from "axios";
import Config from "../Config";

const apiUrl = Config.ApiUrl;
//console.log("🚀 ~ file: ProfileService.jsx:7 ~ apiUrl:", apiUrl)

const JobService = {
   find: async function ({ token, loggedUser }) {
    try {
      const result = await axios.get(
        `${apiUrl}/job/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },

  
  create: async (createInfo, loggedUser, token) => {
 //  console.log("🚀 ~ file: EducationService.jsx:27 ~ create: ~ createInfo:", createInfo)
    createInfo.profileId = loggedUser.userId;
    try {
      const profileInfo = await axios.post(
        `${apiUrl}/job/`, createInfo, { headers:{ 
          Authorization: token,
        }}) 
  
      return profileInfo;
    } catch (error) {
      console.log(error)
    }
  },

  update: async (userId, token, updateInfo) => {
    try {
      const jobInfo = await axios.put(
        `${apiUrl}/job/${userId}`, updateInfo, { headers:{ 
          Authorization: token,
        }}) 
  
      return jobInfo;
    } catch (error) {
      console.log(error)
    }
  },

  remove: async (profiileId, loggedUser, token) => {
    try {
      const jobInfo = await axios.delete(`${apiUrl}/job/${profiileId}/`, {headers:{
        Authorization: token,
      }});
      return jobInfo; 
    } catch (error) {
      console.log(error)
    }
  },
};

export default JobService;
