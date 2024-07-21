import { ReactElement, Dispatch, SetStateAction } from "react";
import { Dialog } from "primereact/dialog";

interface ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

export default function Modal({ visible, setVisible, children }: ModalProps) {
  if (!visible) return null;

  function headerElement() {
    return (
      <div className="modal-header">
        {/* {currentAppointment && (
          <div className="back-btn" onClick={() => setCurrentAppointment(null)}>
            <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.285157 10.4992C0.285549 9.93801 0.740803 9.48347 1.302 9.48387L25.4032 9.50081C25.9644 9.50121 26.4189 9.95644 26.4185 10.5176C26.4183 11.0788 25.9629 11.5335 25.4017 11.5331L1.30057 11.5161C0.73938 11.5157 0.284764 11.0605 0.285157 10.4992Z"
                fill="#555555"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.201 0.296978C11.5981 0.693445 11.5987 1.33682 11.2022 1.734L2.45187 10.5L11.2022 19.266C11.5987 19.6632 11.5981 20.3066 11.201 20.703C10.8038 21.0995 10.1604 21.0989 9.76394 20.7018L0.296984 11.2179C-0.0989948 10.8212 -0.0989948 10.1788 0.296984 9.78208L9.76394 0.298251C10.1604 -0.09892 10.8038 -0.0994888 11.201 0.296978Z"
                fill="#555555"
              />
            </svg>
          </div>
        )} */}
        <div className="header-text">Заголовок</div>
      </div>
    );
  }

  return (
    <Dialog
      header={headerElement}
      visible={visible}
      style={{ width: "90vw", height: "90dvh" }}
      closable={false}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      {children}
    </Dialog>
  );
}
