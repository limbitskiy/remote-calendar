import "../../assets/styles/appointment.scss";

// redux
import { useSelector } from "react-redux";

// primereact
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function AppointmentList({ date, onCreateNew, onEdit, onRemove, onBack }) {
  const [data, setData] = useState([]);
  const appointments = useSelector((state) => state.appointments.value);

  useEffect(() => {
    if (!appointments) return;

    setData(appointments.filter((app) => new Date(app.date).getDate() === new Date(date).getDate()));
  }, [appointments, date]);

  function getReadableTimeString(date) {
    let hours = new Date(date).getHours();
    if (hours.toString().length === 1) {
      hours = `0${hours}`;
    }
    let minutes = new Date(date).getMinutes();
    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  if (!data?.length) {
    return (
      <>
        <span>нету записей</span>
        <div className="btn-cnt">
          <Button label="Назад" icon="pi pi-external-link" onClick={onBack} />
          <Button label="Создать запись" icon="pi pi-external-link" onClick={onCreateNew} />
        </div>
      </>
    );
  } else {
    return (
      <div className="appointment-list">
        {data
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((item) => (
            <div key={item._id} className="appointment-list-item">
              <div className="left-part">
                <span>{item.name}</span>
                <span>{item.price}</span>
                <div className="app-time">{getReadableTimeString(item.date)}</div>
              </div>
              <div className="appointment-btns">
                <div className="edit-btn" onClick={() => onEdit(item)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.310147 19.6863L0.313821 19.69C0.411232 19.7881 0.527078 19.866 0.6547 19.9192C0.782321 19.9724 0.9192 19.9999 1.05747 20C1.17381 19.9999 1.28935 19.9807 1.39948 19.9432L7.39552 17.9092L18.9015 6.40307C19.6049 5.69961 20 4.74553 20 3.75073C20 2.75593 19.6047 1.8019 18.9013 1.0985C18.1978 0.395097 17.2438 -4.35486e-05 16.249 3.59984e-09C15.2542 4.35558e-05 14.3002 0.395268 13.5968 1.09873L2.09077 12.6048L0.0569311 18.6008C-0.00713476 18.7872 -0.0173608 18.988 0.0274254 19.18C0.0722116 19.372 0.170197 19.5475 0.310147 19.6863ZM14.5522 2.05414C15.0029 1.60695 15.6123 1.35655 16.2472 1.35777C16.882 1.35899 17.4905 1.61173 17.9394 2.06064C18.3883 2.50956 18.641 3.11806 18.6422 3.75291C18.6434 4.38776 18.393 4.99722 17.9458 5.44783L16.4328 6.96089L13.0391 3.5672L14.5522 2.05414ZM3.26924 13.3372L12.0837 4.52261L15.4774 7.9163L6.66285 16.7309L1.527 18.4731L3.26924 13.3372Z"
                      fill="#444444"
                    />
                  </svg>
                </div>
                <div className="remove-btn" onClick={() => onRemove(item)}>
                  <svg width="21" height="2" viewBox="0 0 21 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.16667 0H19.8333C20.1428 0 20.4395 0.105357 20.6583 0.292893C20.8771 0.48043 21 0.734784 21 1C21 1.26522 20.8771 1.51957 20.6583 1.70711C20.4395 1.89464 20.1428 2 19.8333 2H1.16667C0.857247 2 0.560501 1.89464 0.341709 1.70711C0.122916 1.51957 0 1.26522 0 1C0 0.734784 0.122916 0.48043 0.341709 0.292893C0.560501 0.105357 0.857247 0 1.16667 0Z"
                      fill="#E31212"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}

        <div className="btn-cnt">
          <Button label="Назад" icon="pi pi-external-link" onClick={onBack} />
          <Button label="Создать запись" icon="pi pi-external-link" onClick={onCreateNew} />
        </div>
      </div>
    );
  }
}
