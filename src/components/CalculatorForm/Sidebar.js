import React from "react";
import car6 from "../../assets/images/car13.png"; // relative path to image

const Sidebar = (props) => {
  const { page, isDisabledButtonFirst, isDisabledButtonSecond } = props;

  return (
    <div className="calculator__steps">
      <div className={`${page === 0 ? "active" : ""} calculator__step`}>
        <button name="currentStep" onClick={() => props.next(0)}>
          Выбор марки и типа ТС
        </button>
      </div>
      <div className={`${page === 1 ? "active" : ""} calculator__step`}>
        <button
          name="currentStep"
          onClick={() => props.next(1)}
          disabled={isDisabledButtonFirst ? "disabled" : ""}
        >
          Вводные данные
        </button>
      </div>
      <div className={`${page === 2 ? "active" : ""} calculator__step`}>
        <button
          name="currentStep"
          onClick={() => props.next(2)}
          disabled={
            isDisabledButtonFirst || isDisabledButtonSecond ? "disabled" : ""
          }
        >
          Посчитать результат
        </button>
      </div>
      <div className={`calculator__img`}>
        <img src={car6} alt={"car_img"} />
      </div>
    </div>
  );
};

export default Sidebar;
