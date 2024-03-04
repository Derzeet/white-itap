import axios from "axios";
import defaultURL from "../data/baseURL";

const API_URL = "/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(defaultURL + API_URL + "signin", {
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
    return axios.post(defaultURL +     API_URL + "signup", {
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
