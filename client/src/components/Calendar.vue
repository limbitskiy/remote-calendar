<template>
  <Login v-if="!isLoggedIn" />
  <template v-else>
    <DatePicker v-model="selectedDateString" class="w-full" inline @date-select="onDateSelect" @month-change="onMonthChange">
      <template #date="slotProps">
        <strong v-if="isAppointments({ month: slotProps.date.month, day: slotProps.date.day })" class="selected-day relative">{{ slotProps.date.day }}</strong>
        <template v-else>{{ slotProps.date.day }}</template>
      </template>
    </DatePicker>
    <Dialog v-model:visible="modalVisible" modal :closable="true" class="w-full h-dvh">
      <template #container="{ closeCallback }">
        <div class="modal-body flex flex-col justify-between h-full">
          <Transition mode="out-in">
            <div v-if="selectedAppointmentObject" class="day-dialog flex flex-col flex-1">
              <div class="modal-start flex flex-col flex-1">
                <div class="header h-16 grid place-items-center text-lg font-medium">{{ new Date(selectedDateString).toLocaleDateString("ru") }}</div>
                <Appointment :appointment="selectedAppointmentObject" />
              </div>
              <div class="footer bg-gray-200">
                <div class="footer-btns flex flex-col gap-2 p-5">
                  <Button label="Сохранить" severity="success" @click="onSubmitAppointment" />
                  <Button
                    label="Отменить"
                    severity="danger"
                    @click="
                      () => {
                        selectedAppointmentObject = null;
                      }
                    "
                  />
                </div>
              </div>
            </div>

            <div v-else class="appointment-dialog flex flex-col flex-1">
              <div class="modal-start flex flex-col flex-1">
                <div class="header h-16 grid place-items-center text-lg font-medium">{{ new Date(selectedDateString).toLocaleDateString("ru") }}</div>
                <Day :day="dateAppointments" @appSelect="onAppointmentSelect" @appRemove="onAppointmentRemove" />
              </div>
              <div class="footer bg-gray-200">
                <div class="footer-btns flex flex-col gap-2 p-5">
                  <Button label="Добавить" severity="success" @click="initEmptyAppointment" />
                  <Button
                    label="Отменить"
                    severity="danger"
                    @click="
                      () => {
                        // selectedDateString = null;
                        closeCallback();
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </Dialog>
  </template>
</template>

<script setup lang="ts">
import DatePicker from "primevue/datepicker";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Day from "@/components/Day.vue";
import Appointment from "@/components/Appointment.vue";
import Login from "@/components/Login.vue";
import useAppointments from "../composables/useAppointments";

const {
  isLoggedIn,
  modalVisible,
  selectedDateString,
  selectedAppointmentObject,
  dateAppointments,
  onSubmitAppointment,
  initEmptyAppointment,
  onAppointmentSelect,
  onAppointmentRemove,
  onDateSelect,
  isAppointments,
  onMonthChange,
} = useAppointments();
</script>
