import React from "react";
import { Field, FieldArray } from "formik";
import { types, brands } from "../../constants";
import { RadioButton, TextInput } from "./FormikElements";

const Step1 = (props) => {
  const { type } = props.parentState.values;
  const values = { types };

  return (
    <div className="form-group">
      <p>
        Для вашего удобства мы разработали удобный калькулятор, который позволит
        рассчитать точный расход топлива вашего транспортного средства в
        соответствии с действующими нормами Министерства транспорта. Для этого
        вам всего лишь нужно пройти все шаги и ввести требуемую информацию.
      </p>
      <p>На первом шаге вам необходимо выбрать тип и марку автомобиля.</p>
      <div className="calculator__content-item active">
        <Field
          component={TextInput}
          name={"brand"}
          placeholder={"Введите марку ..."}
          label={"Марка авто"}
          className={"form-control"}
        />

        <div className="calculator__content-row">
          <div className="calculator__content-group">
            <div className="calculator__content-group-header">
              <span>Тип</span>
            </div>
          </div>
          <div className="calculator__content-group">
            <div className="calculator__content-group-header">
              <span>Марка</span>
            </div>
          </div>
        </div>
        <div className="calculator__content-inner">
          <div className="calculator__content-row">
            <div className="calculator__content-group">
              <FieldArray name="types">
                <div>
                  {values.types &&
                    values.types.length > 0 &&
                    values.types.map((typeName, index) => (
                      <div key={index}>
                        <Field
                          name="type"
                          id={typeName}
                          component={RadioButton}
                          label={typeName}
                          className="form-check-input invisible"
                        />
                      </div>
                    ))}
                </div>
              </FieldArray>
            </div>

            <div className="calculator__content-group">
              <div className="mCustomScrollBox">
                <div className="mCSB_container">
                  {brands[type].map((item) => {
                    return (
                      <div key={item}>
                        <Field
                          name={"brand"}
                          id={item}
                          component={RadioButton}
                          label={item}
                          className={`form-check-input invisible`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
