import React from "react";
import { Field } from "formik";
import { MyHiddenField, NumberInput } from "./FormikElements";

import vsbig from "../../assets/images/vs-big.png";
import vs from "../../assets/images/vs.png";
import vs1 from "../../assets/images/vs1.png";
import vs2 from "../../assets/images/vs2.png";

const Step3 = (props) => {
  const {
    filters,
    distance,
    fuelLiters,
    fuelSum,
    gasLiters,
    gasSum,
  } = props.parentState.values;

  return (
    <>
      <div className="form-group">
        <Field
          label={"Расстояние"}
          component={NumberInput}
          name={"distance"}
          placeholder={"Расстояние ..."}
          className={"form-control"}
        />
      </div>

      {distance !== "" &&
        filters.includes("Бензин") &&
        !filters.includes("Газ") && (
          <div className="calc-sum">
            <h2>Итого:</h2>
            <div className="calculator__oils-total">
              <p className="calculator__oils">
                Необходимое количество бензина:{" "}
                <span>
                  <b>{fuelLiters} л.</b>
                </span>
              </p>{" "}
              <p className="calculator__oils">
                Стоимость поездки:{" "}
                <span>
                  <b>{fuelSum} грн.</b>
                </span>
              </p>{" "}
              <p className="calculator__oils"></p>
            </div>
          </div>
        )}

      {distance !== "" &&
        filters.includes("Газ") &&
        !filters.includes("Бензин") && (
          <div className="calc-sum">
            <h2>Итого:</h2>
            <div className="calculator__oils-total">
              <p className="calculator__oils">
                Необходимое количество газа:{" "}
                <span>
                  <b>{gasLiters} л.</b>
                </span>
              </p>{" "}
              <p className="calculator__oils">
                Стоимость поездки:{" "}
                <span>
                  <b>{gasSum} грн.</b>
                </span>
              </p>{" "}
              <p className="calculator__oils"></p>
            </div>
          </div>
        )}

      {distance !== "" &&
        filters.includes("Бензин") &&
        filters.includes("Газ") && (
          <div className="calc-sum">
            <h2>Итого:</h2>
            <div className="calculator__oils-total">
              <table className="table calculator__oils">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Бензин</th>
                    <th>
                      <img src={vsbig} alt={"vs"} className="icon-tb" />
                    </th>
                    <th scope="col">Газ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Необходимое количество бензина:</th>
                    {fuelLiters === gasLiters && (
                      <>
                        <td>{fuelLiters} л.</td>
                        <td>
                          <img src={vs} alt={"vs"} className="icon-tb" />
                        </td>
                        <td>{gasLiters} л.</td>
                      </>
                    )}
                    {fuelLiters > gasLiters && (
                      <>
                        <td>{fuelLiters} л.</td>
                        <td>
                          <img src={vs1} alt={"vs1"} className="icon-tb" />
                        </td>
                        <td>
                          <span>{gasLiters} л.</span>
                        </td>
                      </>
                    )}
                    {fuelLiters < gasLiters && (
                      <>
                        <td>
                          <span>{fuelLiters} л.</span>
                        </td>
                        <td>
                          <img src={vs2} alt={"vs2"} className="icon-tb" />
                        </td>
                        <td>{gasLiters} л.</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Стоимость поездки:</th>
                    {Number(fuelSum) === Number(gasSum) && (
                      <>
                        <td>{fuelSum} грн.</td>
                        <td>
                          <img src={vs} alt={"vs"} className="icon-tb" />
                        </td>
                        <td>{gasSum} грн.</td>
                      </>
                    )}
                    {Number(fuelSum) > Number(gasSum) && (
                      <>
                        <td>{fuelSum} грн.</td>
                        <td>
                          <img src={vs1} alt={"vs1"} className="icon-tb" />
                        </td>
                        <td>
                          <span>{gasSum} грн.</span>
                        </td>
                      </>
                    )}
                    {Number(fuelSum) < Number(gasSum) && (
                      <>
                        <td>
                          <span>{fuelSum} грн.</span>
                        </td>
                        <td>
                          <img src={vs2} alt={"vs2"} className="icon-tb" />
                        </td>
                        <td>{gasSum} грн.</td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="calculator__oils-total text_block">
              <img src={vs} alt={"vs"} className="icon-tb" />
              <p className="calculator__oils">
                Экономия в{" "}
                <span>
                  <b>{Math.abs(Number(fuelSum) - Number(gasSum))} грн.</b>
                </span>
                <br />
                Выгоднее использовать{" "}
                <span>
                  <b>
                    {Number(fuelSum) - Number(gasSum) > 0 ? "Газ" : "Бензин"}
                  </b>
                </span>
                .
              </p>
            </div>
          </div>
        )}

      {distance !== "" && filters.includes("Газ/Бензин") && (
        <div className="calc-sum">
          <h2>Итого:</h2>
          <div className="calculator__oils-total">
            <p className="calculator__oils">
              Необходимое количество газа:{" "}
              <span>
                <b>{gasLiters} л.</b>
              </span>{" "}
              / стоимость:{" "}
              <span>
                <b>{gasSum} грн.</b>
              </span>
            </p>
            <p className="calculator__oils">
              Необходимое количество бензина:{" "}
              <span>
                <b>{fuelLiters} л.</b>
              </span>{" "}
              / стоимость:{" "}
              <span>
                <b>{fuelSum} грн.</b>
              </span>
            </p>
            <p className="calculator__oils">
              Стоимость поездки:{" "}
              <span>
                <b>{Number(fuelSum) + Number(gasSum)} грн.</b>
              </span>
            </p>{" "}
            <p className="calculator__oils"></p>
          </div>
        </div>
      )}
      <MyHiddenField name="fuelLiters" className={"form-control hide"} />
      <MyHiddenField name="gasLiters" className={"form-control hide"} />
    </>
  );
};

export default Step3;
