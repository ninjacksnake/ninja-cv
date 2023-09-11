import axios from "axios";
import Config from "../Config";

const AuthService = {
  LogIn: async ({ username, password }) => {
    try {
      const token = await axios.post(`${Config.ApiUrl}/login`, {
        username,
        password,
      });
      return token.data.authToken;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  Register: async ({username, password}) =>{
    try {
      const newUser = await axios.post(`${Config.ApiUrl}/register`,{
        username,
        password,
      });
      return newUser
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  LogOut: () => {
    axios.post("/logout", {});
  },
};

export default AuthService;
