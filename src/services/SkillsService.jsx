import axios from "axios";
import Config from "../Config";
import { message } from "antd";

const SkillsService = {
  find: async function ({ token, loggedUser }) {
    try {
      const result = await axios.get(
        `${Config.ApiUrl}/skills/${loggedUser.userId}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return result.data;
    } catch (error) {
      message.error(error.message);
    }
  },
  create: async function ({ token, loggedUser, skill }) {
    try {
      const result = await axios.post(
        `${Config.ApiUrl}/skills/${loggedUser.userId}/`,
        skill,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return result.data;
    } catch (error) {
      message.error(error.message);
    }
  },
  update: async function ({ token, loggedUser, skill }) {
    try {
      const result = await axios.put(
        `${Config.ApiUrl}/skills/${loggedUser.userId}/${skill.id}/`,
        skill,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return result.data;
    } catch (error) {
      message.error(error.message);
    }
  },
  delete: async function ({ token, loggedUser, skill }) {
    try {
      const result = await axios.delete(
        `${Config.ApiUrl}/skills/${loggedUser.userId}/${skill.id}/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return result.data;
    } catch (error) {
      message.error(error.message);
    }
  },
};

export default SkillsService;
