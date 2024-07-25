<template>
  <div class="appointment-data flex flex-col flex-1 gap-2 p-5 bg-gray-200 overflow-y-auto">
    <div class="flex flex-col gap-2">
      <label for="name">Имя</label>
      <InputText id="name" v-model="state.name" aria-describedby="name-help" />
    </div>
    <div class="flex flex-col gap-2">
      <label for="price">Цена</label>
      <InputNumber v-model="state.price" inputId="price" fluid />
    </div>
    <div class="flex flex-col gap-2">
      <label for="date">Время</label>
      <!-- BUG: manual input makes date today's date -->
      <DatePicker id="date" v-model="state.date" timeOnly :manualInput="false" fluid />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";

// types
import { Appointment } from "../types";

const props = defineProps<{
  appointment: Appointment;
}>();

const state = ref(props.appointment);
</script>
