import axios from "axios";

// const items = [
//   {
//     _id: "669b7e56be1c16e3ad6fc4d4",
//     name: "Jackson",
//     price: 1500,
//     date: "2024-07-03T17:30:00.000Z",
//   },
//   {
//     _id: "669b84718ab125e7fc518b63",
//     name: "Brad",
//     price: 2500,
//     date: "2024-07-11T11:45:00.000Z",
//   },
//   {
//     _id: "669b7e56be1c16e3ad6fc4d4",
//     name: "Mary",
//     price: 2000,
//     date: "2024-07-13T12:30:00.000Z",
//   },
//   {
//     _id: "669пвап6618ab125e7fc518b63",
//     name: "Борисина Дмитриевна",
//     price: 3500,
//     date: "2024-07-01T11:30:00.000Z",
//   },
//   {
//     _id: "4543еавп18b63",
//     name: "Елена Сергеевна",
//     price: 3000,
//     date: "2024-07-01T15:50:00.000Z",
//   },
//   {
//     _id: "669b8471вапвап25e7fc518b63",
//     name: "Василиса Егоровна",
//     price: 3000,
//     date: "2024-07-01T13:00:00.000Z",
//   },
// ];

function generateId() {
  return Math.random() * 9999;
}

export async function getMonthAppointments({ year, month }) {
  try {
    const result = await axios.post("http://localhost:5005/get-month", {
      year,
      month,
    });

    if (result.status !== 200) {
      throw new Error(`Failed to get month appointments`);
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addAppointment({ name, price, date }) {
  try {
    const result = await axios.post("http://localhost:5005/create-appointment", {
      name,
      price,
      date,
    });

    if (result.status !== 201) {
      throw new Error(`Failed to add apointment`);
    }

    return {
      _id: result.data.insertedId,
      name,
      price,
      date,
    };
  } catch (error) {
    console.error(error);
  }
}

export function editItem(data) {
  const filtered = items.filter((item) => item._id !== data._id);

  const newItems = [...filtered, data];
  return new Promise((res) => {
    setTimeout(() => res(newItems), 1000);
  });
}

// export function removeItem({ _id }) {
//   const newItems = items.filter((item) => item._id !== _id);

//   return new Promise((res) => {
//     setTimeout(() => res(newItems), 1000);
//   });
// }
export async function deleteAppointment({ _id }) {
  try {
    const result = await axios.post("http://localhost:5005/remove-appointment", {
      _id,
    });

    console.log(result);

    if (result.data.deletedCount !== 1) {
      throw new Error(`Failed to delete apointment`);
    }

    return { _id };
  } catch (error) {
    console.error(error);
  }
}
