import axios from "axios";

export async function getMonthAppointments({ year, month }) {
  try {
    const result = await axios.post(
      "http://localhost:5005/get-month",
      {
        year,
        month,
      },
      { withCredentials: true }
    );

    if (result.status !== 200) {
      throw new Error(`Failed to get month appointments`);
    }

    return result.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { unauthorized: true };
    }
    console.error(error);
  }
}

export async function addAppointment({ name, price, date }) {
  try {
    const result = await axios.post(
      "http://localhost:5005/create-appointment",
      {
        name,
        price,
        date,
      },
      { withCredentials: true }
    );

    if (result.status !== 201) {
      throw new Error(`Failed to add apointment`);
    }

    return result.data.insertedId;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAppointment(_id) {
  try {
    const result = await axios.post(
      "http://localhost:5005/remove-appointment",
      {
        _id,
      },
      { withCredentials: true }
    );

    if (result.data.deletedCount !== 1) {
      throw new Error(`Failed to delete apointment`);
    }

    return _id;
  } catch (error) {
    console.error(error);
  }
}

export async function patchAppointment(_id, payload) {
  try {
    const result = await axios.post(
      "http://localhost:5005/update-appointment",
      {
        _id,
        payload,
      },
      { withCredentials: true }
    );

    if (result.data?.modifiedCount === 1) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
  }
}

export async function login(pass: string) {
  try {
    await axios.post(
      "http://localhost:5005/login",
      {
        pass,
      },
      { withCredentials: true }
    );

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}
