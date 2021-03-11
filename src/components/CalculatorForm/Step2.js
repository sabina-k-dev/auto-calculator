import React from "react";
import { Field } from "formik";
import { ratioFuelGasArr } from "../../constants";
import { FilterCheckbox, Error, NumberInput } from "./FormikElements";
import vsbig from "../../assets/images/vs-big.png";

const Step2 = (props) => {
  const { filters } = props.parentState.values;

  return (
    <>
      <div className="form-group">
        <p>
          На втором шаге вам необходимо выбрать средний расход топлива
          автомобиля и стоимость 1л топлива.
        </p>

        <div className="filterSection">
          {["Бензин", "Газ", "Газ/Бензин"].map((val) => {
            return (
              <div className="form-check" key={val}>
                <img
                  src={vsbig}
                  alt={"car"}
                  className={
                    val === "Бензин" &&
                    filters.includes("Газ") &&
                    filters.includes("Бензин")
                      ? "icon"
                      : "icon not-active"
                  }
                />
                <Field
                  className="form-control"
                  component={FilterCheckbox}
                  name="filters"
                  value={val}
                  label={val}
                />
              </div>
            );
          })}
          <Error name={"filters"} />
        </div>

        <div
          className={`${
            filters.includes("Бензин") ? "show" : "hide"
          } fuelSection`}
        >
          <Field
            component={NumberInput}
            name={"fuelСonsumption"}
            placeholder={"Средний расход бензина..."}
            label={"Средний расход бензина"}
            className={"form-control"}
          />
          <Field
            label={"Стоимость 1л бензина"}
            component={NumberInput}
            name={"fuelPrice"}
            placeholder={"Стоимость бензина..."}
            className={"form-control"}
          />
        </div>

        <div
          className={`${filters.includes("Газ") ? "show" : "hide"} gasSection`}
        >
          <Field
            label={"Средний расход газа"}
            component={NumberInput}
            name={"gasСonsumption"}
            placeholder={"Средний расход газа..."}
            className={"form-control"}
          />
          <Field
            label={"Стоимость 1л газа"}
            component={NumberInput}
            name={"gasPrice"}
            placeholder={"Стоимость газа..."}
            className={"form-control"}
          />
        </div>

        <div
          className={`${
            filters.includes("Газ/Бензин") ? "show" : "hide"
          } fuelGasSection`}
        >
          <label htmlFor="ratioFuelGas">Соотношение газа/бензина</label>
          <Field
            name={"ratioFuelGas"}
            component={"select"}
            className={"form-control"}
          >
            {ratioFuelGasArr.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Field>

          <Field
            label={"Средний расход топлива на 100км"}
            component={NumberInput}
            name={"fuelGasСonsumption"}
            placeholder={"Средний расход топлива..."}
            className={"form-control"}
          />

          <Field
            label={"Стоимость 1л бензина"}
            component={NumberInput}
            name={"fuelPrice"}
            placeholder={"Стоимость бензина..."}
            className={"form-control"}
          />

          <Field
            label={"Стоимость 1л газа"}
            component={NumberInput}
            name={"gasPrice"}
            placeholder={"Стоимость газа..."}
            className={"form-control"}
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
