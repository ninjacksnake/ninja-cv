import axios from "axios";
import Config from "../Config";

const apiUrl = Config.ApiUrl;
//console.log("🚀 ~ file: ProfileService.jsx:7 ~ apiUrl:", apiUrl)

const ProfileService = {
  find: async function ({ token, loggedUser }) {
   // console.log("profi", loggedUser);
    try {
      const result = await axios.get(
        `${apiUrl}/profile/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //  console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
  findSkills: async function ({ token, loggedUser }) {
    // console.log("profi", loggedUser);
    try {
      const result = await axios.get(
        `${apiUrl}/profile/skills/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //  console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },

  create: async (createInfo) => {
    const profileInfo = await axios.post(`${apiUrl}/profile/}`, createInfo);
    return profileInfo;
  },

  update: async (userId, token, updateInfo) => {
    try {
      const profileInfo = await axios.put(
        `${apiUrl}/profile/${userId}/`,
        updateInfo,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return profileInfo;
    } catch (error) {
      console.log(error);
    }
  },

  remove: async (profiileId) => {
    const profileInfo = await axios.get(`${apiUrl}/profile/`);
    return profileInfo;
  },
};

export default ProfileService;
