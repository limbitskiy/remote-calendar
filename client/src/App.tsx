import { useState, useEffect } from "react";

// components
import Cal from "./components/Cal";
import AppointmentDetails from "./components/ui/AppointmentDetails";
import AppointmentList from "./components/ui/AppointmentList";
import Modal from "./components/ui/Modal";

// primereact
import { Button } from "primereact/button";

// redux
import { useDispatch } from "react-redux";
import { createAppointment, editAppointment, removeAppointment } from "./store/appointmentSlice";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const dispatch = useDispatch();

  const openModal = () => setModalVisible(true);

  function closeModal() {
    setModalVisible(false);
    setSelectedAppointment(null);
  }

  function handleDateClick(data) {
    setSelectedDate(data);
    openModal();
  }

  function handleEditAppointment(data) {
    const serialized = { ...data, date: data.date.toISOString() };

    if (data._id) {
      dispatch(editAppointment(serialized));
    } else {
      dispatch(createAppointment(serialized));
    }
    setCurrentPage("list");
  }

  function handleRemoveAppointment(data) {
    dispatch(removeAppointment(data));
    closeModal();
  }

  return (
    <div className="layout">
      <div className="calendar-cnt">
        <Cal onDateSelect={handleDateClick} />
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <>
          {currentPage === "list" && (
            <AppointmentList
              date={selectedDate}
              onCreateNew={() => {
                setSelectedAppointment({
                  name: "",
                  price: 0,
                  date: selectedDate,
                });
                setCurrentPage("details");
              }}
              onEdit={(item) => {
                setSelectedAppointment(item);
                setCurrentPage("details");
              }}
              onRemove={handleRemoveAppointment}
              onBack={closeModal}
            />
          )}
          {currentPage === "details" && <AppointmentDetails data={selectedAppointment} onBack={() => setCurrentPage("list")} onSubmit={handleEditAppointment} />}
        </>
      </Modal>
    </div>
  );
}

export default App;
