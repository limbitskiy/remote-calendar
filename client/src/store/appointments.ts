import { ref } from "vue";
import { defineStore } from "pinia";
import { getMonthAppointments, addAppointment, deleteAppointment, patchAppointment } from "../api/index";
import { authStore } from "./auth";

const enum Procedures {
  "Маникюр",
  "Педикюр",
}

export const appointmentsStore = defineStore("appointments", () => {
  const appointments = ref([]);

  const getAppointmentId = (id: string) => {
    const idx = appointments.value.findIndex((app) => app._id === id);

    if (idx < 0) {
      console.error(`Could not find index of ${id}`);
      return false;
    }

    return idx;
  };

  const getAppointments = async ({ year, month }) => {
    const result = await getMonthAppointments({ year, month });

    if (result.unauthorized) {
      const store = authStore();
      store.setIsLoggedIn(false);
      return;
    }

    appointments.value = result;
  };

  const createAppointment = async (data) => {
    const _id = await addAppointment(data);

    if (!_id) {
      console.error(`Error creating appointment`);
      return;
    }

    const newAppointment = { ...data, _id };
    appointments.value.push(newAppointment);
  };

  const removeAppointment = async (_id) => {
    const id = await deleteAppointment(_id);

    if (!id) {
      console.error(`Error deleting appointment`);
      return;
    }

    const idx = getAppointmentId(id);

    if (!idx) return;

    appointments.value.splice(idx, 1);
  };

  const editAppointment = async (data) => {
    const _id = data._id;
    const payload = {};

    Object.keys(data).forEach((key) => {
      if (key === "_id") return;
      payload[key] = data[key];
    });

    const result = await patchAppointment(_id, payload);

    if (!result) {
      console.error(`Couldn't update`);
      return;
    }

    const idx = getAppointmentId(_id);

    if (!idx) return;

    appointments.value.splice(idx, 1, data);
  };

  return { appointments, getAppointments, createAppointment, removeAppointment, editAppointment };
});
