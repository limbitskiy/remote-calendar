import { useEffect, useState } from "react";
import "../../assets/styles/appointment.scss";

// primevue
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

export default function Appointment({ data, onSubmit, onBack }) {
  const [appointmentData, setAppointmentData] = useState(data);

  useEffect(() => {
    if (data) {
      setAppointmentData({
        _id: data._id,
        name: data.name,
        price: data.price,
        date: new Date(data.date),
      });
    }
  }, [data]);

  return (
    <div className="appointment">
      <div className="input-group">
        <label htmlFor="name">Имя</label>
        <InputText id="name" aria-describedby="name-help" value={appointmentData.name} onChange={(e) => setAppointmentData((prev) => ({ ...prev, name: e.target.value }))} />
      </div>
      <div className="input-group">
        <label htmlFor="price">Сумма</label>
        <InputNumber id="price" aria-describedby="price-help" value={+appointmentData.price} onValueChange={(e) => setAppointmentData((prev) => ({ ...prev, price: e.value }))} />
      </div>
      <div className="input-group">
        <label htmlFor="date">Время</label>
        <Calendar
          value={appointmentData.date}
          // dateFormat="dd/mm/yy"
          timeOnly
          // hourFormat="24"
          onChange={(e) => setAppointmentData((prev) => ({ ...prev, date: e.value }))}
        />
      </div>
      <div className="btn-cnt">
        <Button label="Назад" icon="pi pi-external-link" onClick={onBack} />
        <Button label="OK" icon="pi pi-external-link" onClick={() => onSubmit(appointmentData)} />
      </div>
    </div>
  );
}
