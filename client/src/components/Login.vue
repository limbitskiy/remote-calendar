<template>
  <div class="login absolute inset-0 z-50 grid place-items-center">
    <div class="flex flex-col gap-1">
      <label for="pass">Введите пароль</label>
      <InputText id="pass" v-model="password" aria-describedby="pass-help" @input="onInput" />
      <small id="pass-help" class="text-red-500">{{ errorMessage }}</small>
      <Button label="ОК" severity="success" @click="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import useLogin from "@/composables/useLogin";

const { password, errorMessage, onSubmit, onInput } = useLogin();
</script>
