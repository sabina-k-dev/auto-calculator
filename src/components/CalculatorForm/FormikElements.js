import React, { useEffect } from "react";
import { Field, useField, useFormikContext } from "formik";
import { idExists } from "./helper";
import store from "../../modules/store";

// SaveCheckbox input
export const SaveCheckbox = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  form,
  ...props
}) => {
  const state = form.values;
  const { setFieldValue } = form;

  const saveFunction = (event) => {
    const data = store.getState().form.data;

    if (event.target.checked) {
      if (idExists(state.id, data, state)) {
        data["formikData"] = data["formikData"].map((item) =>
          item.id === state.id ? state : item
        );
      } else {
        data["formikData"].push(state);
      }
      setFieldValue(name, true);
    } else {
      setFieldValue(name, false);
      data["formikData"] = data["formikData"].filter(
        (item) => item.id !== state.id
      );
    }
    localStorage.setItem("formikData", JSON.stringify(data));
  };

  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={name === "saveData" ? saveFunction : onChange}
        onBlur={onBlur}
        className={className}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

//step 1
// Radio input
export const RadioButton = ({
  field: { name, value },
  id,
  label,
  className,
  form,
  touched,
  ...props
}) => {
  const { setFieldValue } = form;

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
    if (name === "type") {
      setFieldValue("brand", "");
    }
  };

  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={handleChange}
        className={`${className}${id === value ? " active" : ""}`}
        {...props}
      />
      <label htmlFor={id} className={`${id === value ? "active" : ""}`}>
        {label}
      </label>
    </div>
  );
};

//step 2
export const FilterCheckbox = ({ field, form, label, ...rest }) => {
  const { name, value: arr } = field;
  const { setFieldValue } = form;

  const handleChange = (event) => {
    const values = arr || [];
    const index = values.indexOf(rest.value);
    if (index === -1) {
      if (rest.value === "Газ/Бензин") {
        values.splice(0, values.length);
      } else {
        const delIndex = values.indexOf("Газ/Бензин");
        if (values.indexOf("Газ/Бензин") !== -1) {
          values.splice(delIndex, 1);
        }
      }
      values.push(rest.value);
    } else {
      values.splice(index, 1);
    }
    setFieldValue(name, values);
  };

  return (
    <label>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={arr.indexOf(rest.value) !== -1}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
};

export const NumberInput = ({
  field,
  id,
  label,
  className,
  form: { errors, touched },
  ...props
}) => {
  const extraClass = !touched[field.name]
    ? ""
    : errors[field.name]
    ? "is-invalid"
    : "is-valid";

  return (
    <div>
      <label>{label}</label>
      <input
        {...field}
        name={field.name}
        type="number"
        className={`${className} ${extraClass}`}
        {...props}
      />
      <Error name={field.name} />
    </div>
  );
};

export const TextInput = ({
  field,
  id,
  label,
  className,
  form: { errors, touched },
  ...props
}) => {
  const extraClass = !touched[field.name]
    ? ""
    : errors[field.name]
    ? "is-invalid"
    : "is-valid";

  return (
    <div>
      <label>{label}</label>
      <input
        {...field}
        name={field.name}
        type="text"
        className={`${className} ${extraClass}`}
        {...props}
      />
      <Error name={field.name} />
    </div>
  );
};

export const Error = ({ name }) => (
  <Field name={name}>
    {({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? (
        <div className="error-notice">{errors[name]}</div>
      ) : null
    }
  </Field>
);

//step 2 and 3
export const MyHiddenField = (props) => {
  const {
    values: {
      distance,
      fuelСonsumption,
      fuelPrice,
      gasСonsumption,
      gasPrice,
      ratioFuelGas,
      fuelGasСonsumption,
      filters,
    },
    touched,
    setFieldValue,
    className,
  } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    setFieldValue("saveData", false);
    let isCurrent = true;
    if (filters.includes("Газ")) {
      if (distance !== "" && gasСonsumption !== "") {
        let consumption = gasСonsumption;
        fetchCountLiters(distance, consumption).then((countGasLiters) => {
          if (isCurrent) {
            setFieldValue("gasLiters", Number(countGasLiters).toFixed(2));
            setFieldValue(
              "gasSum",
              Number(countGasLiters * gasPrice).toFixed(2)
            );
          }
        });
      }
    }
    if (filters.includes("Бензин")) {
      if (distance !== "" && fuelСonsumption !== "") {
        let consumption = fuelСonsumption;
        fetchCountLiters(distance, consumption).then((countFuelLiters) => {
          if (isCurrent) {
            setFieldValue("fuelLiters", Number(countFuelLiters).toFixed(2));
            setFieldValue(
              "fuelSum",
              Number(countFuelLiters * fuelPrice).toFixed(2)
            );
          }
        });
      }
    }
    if (filters.includes("Газ/Бензин")) {
      if (
        distance !== "" &&
        fuelGasСonsumption !== "" &&
        ratioFuelGas.trim() !== ""
      ) {
        const countGas = Number(ratioFuelGas.split("/")[0]);
        const countFuel = Number(ratioFuelGas.split("/")[1]);
        let consumption = fuelGasСonsumption;

        if (props.name === "gasLiters") {
          fetchCountLiters(distance, consumption).then((countGasLiters) => {
            if (isCurrent) {
              setFieldValue(
                "gasLiters",
                Number((countGasLiters / 100) * countGas).toFixed(2)
              );
              setFieldValue(
                "gasSum",
                Number((countGasLiters / 100) * countGas * gasPrice).toFixed(2)
              );
            }
          });
        }
        if (props.name === "fuelLiters") {
          fetchCountLiters(distance, consumption).then((countFuelLiters) => {
            if (isCurrent) {
              setFieldValue(
                "fuelLiters",
                Number((countFuelLiters / 100) * countFuel).toFixed(2)
              );
              setFieldValue(
                "fuelSum",
                Number((countFuelLiters / 100) * countFuel * fuelPrice).toFixed(
                  2
                )
              );
            }
          });
        }
      }
    }
    return () => {
      isCurrent = false;
    };
  }, [
    distance,
    fuelСonsumption,
    gasСonsumption,
    fuelGasСonsumption,
    fuelPrice,
    gasPrice,
    ratioFuelGas,
  ]);
  //<label htmlFor={props.name} >{props.name} </label>
  return (
    <>
      <input type="text" className={className} {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

// Dependent fields with an Async API Request Example
async function fetchCountLiters(distance, consumption) {
  await new Promise((r) => setTimeout(r, 200));
  return Math.ceil((distance / 100) * consumption);
}
