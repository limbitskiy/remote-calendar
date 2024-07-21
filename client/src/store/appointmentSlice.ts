import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMonthAppointments, addAppointment, editItem, deleteAppointment } from "../api";

export const fetchAppointments = createAsyncThunk("appointments/fetchAppointments", async function (data) {
  const response = await getMonthAppointments(data);
  return response;
});

export const createAppointment = createAsyncThunk("appointments/createAppointment", async function (data) {
  const response = await addAppointment(data);
  return response;
});

export const editAppointment = createAsyncThunk("appointments/editAppointment", async function (data) {
  const response = await editItem(data);
  return response;
});

export const removeAppointment = createAsyncThunk("appointments/removeAppointment", async function (data) {
  const response = await deleteAppointment(data);
  return response;
});

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    value: [],
    // status: null,
    // error: null,
  },
  reducers: {
    setAppointments: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        const id = action.payload._id;
        state.value = state.value.filter((item) => item._id !== id);
      });
  },
});

export const { setAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;
