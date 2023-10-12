import axios from "axios";
import Config from "../Config";
import { message } from "antd";

const apiUrl = Config.ApiUrl;
//console.log("🚀 ~ file: ProfileService.jsx:7 ~ apiUrl:", apiUrl)

const ProjectService = {
  find: async function ({ token, loggedUser }) {
    // console.log(
    //   "🚀 ~ file: Project.Service.jsx:11 ~ token, loggedUser :",
    //   token,
    //   loggedUser
    // );
    try {
      const result = await axios.get(
        `${apiUrl}/project/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("Invalid token")) {
        return message.error("Invalid Token");
      }else if (error.response.data.message.includes("Project not found")) {
        return message.error("No Project Found");
      }
      //  console.error(error);
    }
  },

  create: async (createInfo, loggedUser, token) => {
    //  console.log("🚀 ~ file: EducationService.jsx:27 ~ create: ~ createInfo:", createInfo)
    createInfo.profileId = loggedUser.userId;
    try {
      const profileInfo = await axios.post(`${apiUrl}/project/`, createInfo, {
        headers: {
          Authorization: token,
        },
      });

      return profileInfo;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (userId, token, updateInfo) => {
    try {
      const projectInfo = await axios.put(
        `${apiUrl}/project/${userId}`,
        updateInfo,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return projectInfo;
    } catch (error) {
      console.log(error);
    }
  },

  remove: async (projectId, loggedUser, token) => {
    try {
      const projectInfo = await axios.delete(
        `${apiUrl}/project/${projectId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return projectInfo;
    } catch (error) {
      console.log(error);
    }
  },
};

export default ProjectService;
