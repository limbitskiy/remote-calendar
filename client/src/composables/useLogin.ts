import { ref } from "vue";
import { authStore } from "@/store/auth.ts";

const useLogin = () => {
  const store = authStore();
  const { loginUser } = store;

  const password = ref("");
  const errorMessage = ref("");

  async function onSubmit() {
    const pass = password.value.trim();

    if (!pass) return;

    const result = await loginUser(pass);

    if (result.error) {
      errorMessage.value = result.error.message;
      return;
    }
  }

  function onInput() {
    errorMessage.value = "";
  }

  return { password, errorMessage, onSubmit, onInput };
};

export default useLogin;
