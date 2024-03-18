import axios from "axios";
import default_host from "../config/config";

const API_URL = "/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(default_host + 'api/finpol'  + API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, FIO, password, level, user_photo) {
    return axios.post(default_host + 'api/finpol' + API_URL + "signup", {
      username,       
      email,
      FIO,
      password,
      level,
      user_photo
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
