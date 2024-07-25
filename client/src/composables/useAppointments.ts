import { ref, computed, toRaw, watch } from "vue";
import { appointmentsStore } from "@/store/appointments.ts";
import { authStore } from "@/store/auth.ts";
import { storeToRefs } from "pinia";

// types
import { Appointment as IAppointment } from "../types";

const useAppointments = () => {
  const authenticationStore = authStore();
  const store = appointmentsStore();
  const { appointments } = storeToRefs(store);
  const { isLoggedIn } = storeToRefs(authenticationStore);
  const { createAppointment, removeAppointment, editAppointment, getAppointments } = store;

  const modalVisible = ref(false);
  const selectedDateString = ref<string | null>(null);
  const selectedAppointmentObject = ref<IAppointment | null>(null);

  const currentMonth = ref({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  watch(
    [isLoggedIn, currentMonth],
    (val) => {
      if (val) {
        getAppointments({ year: currentMonth.value.year, month: currentMonth.value.month });
      }
    },
    {
      immediate: true,
    }
  );

  const dateAppointments = computed(() => {
    if (!selectedDateString.value) return null;

    const selectedDay = new Date(selectedDateString.value).getDate();
    const selectedYear = new Date(selectedDateString.value).getFullYear();

    return appointments.value.filter((app) => new Date(app.date).getDate() === selectedDay && new Date(app.date).getFullYear() === selectedYear);
  });

  const onSubmitAppointment = () => {
    const data = toRaw(selectedAppointmentObject.value);

    if (data._id) {
      editAppointment(data);
    } else {
      createAppointment(data);
    }

    selectedAppointmentObject.value = null;
  };

  const initEmptyAppointment = () => {
    selectedAppointmentObject.value = { date: new Date(selectedDateString.value) };
  };

  const onAppointmentSelect = (item: IAppointment) => {
    selectedAppointmentObject.value = { ...item, date: new Date(item.date) };
  };

  const onAppointmentRemove = (id) => {
    removeAppointment(id);
  };

  const onDateSelect = () => {
    openModal();
  };

  const openModal = () => {
    modalVisible.value = true;
  };

  const closeModal = () => {
    modalVisible.value = false;
  };

  const isAppointments = ({ month, day }) => {
    if (!appointments.value?.length) return null;

    if (
      appointments.value.find((app) => {
        return new Date(app.date).getDate() === day && new Date(app.date).getMonth() === month;
      })
    ) {
      return true;
    }
  };

  const onMonthChange = (data) => {
    currentMonth.value = { ...data, month: data.month - 1 };
  };

  return {
    currentMonth,
    isLoggedIn,
    modalVisible,
    selectedDateString,
    selectedAppointmentObject,
    dateAppointments,
    onSubmitAppointment,
    onAppointmentRemove,
    initEmptyAppointment,
    onAppointmentSelect,
    onDateSelect,
    isAppointments,
    openModal,
    closeModal,
    onMonthChange,
  };
};

export default useAppointments;
