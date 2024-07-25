import { ref } from "vue";
import { defineStore } from "pinia";
import { login } from "../api/index";

export const authStore = defineStore("auth", () => {
  const isLoggedIn = ref(true);

  const loginUser = async (pass) => {
    const result = await login(pass);

    if (result.response?.status === 401) {
      return {
        error: {
          message: "Неверный пароль",
        },
      };
    }

    setIsLoggedIn(true);
    return true;
  };

  const setIsLoggedIn = (value) => {
    isLoggedIn.value = value;
  };

  return { isLoggedIn, loginUser, setIsLoggedIn };
});
