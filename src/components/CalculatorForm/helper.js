// Check nexButtons (on pages and in sidebar)

export const validateFn = (values, isFirstButton, isSecondButton, formPage) => {
  let firstButton = isFirstButton;
  let secondButton = isSecondButton;
  // Проверяем доступность пагинации при любом изменении
  if (formPage === 0) {
    firstButton = !(values.brand !== "");
  } else if (formPage === 1) {
    secondButton = values.filters.includes("Бензин")
      ? values.filters.includes("Газ")
        ? !(
            values.fuelСonsumption !== "" &&
            values.fuelPrice !== "" &&
            values.gasСonsumption !== "" &&
            values.gasPrice !== ""
          )
        : !(values.fuelСonsumption !== "" && values.fuelPrice !== "")
      : values.filters.includes("Газ")
      ? !(values.gasСonsumption !== "" && values.gasPrice !== "")
      : values.filters.includes("Газ/Бензин")
      ? !(
          values.fuelPrice !== "" &&
          values.gasPrice !== "" &&
          values.fuelGasСonsumption !== ""
        )
      : true;
  }
  // обновляем стейт при любом изменении
  return [firstButton, secondButton];
};

// для чекбокса сохранить данные
export const idExists = (id, data, formValues) => {
  return data["formikData"].some(function (el) {
    return el.id === formValues.id;
  });
};

export const getLocalStorageData = () => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("formikData"));
  } catch (e) {
    data = { formikData: [] }; // set default value if localStorage parsing failed
  }
  return data === null ? { formikData: [] } : data;
};
