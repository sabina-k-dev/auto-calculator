import React from "react";
import { Grid } from "@material-ui/core";
import { Formik, Field } from "formik";
import { SaveCheckbox } from "./FormikElements";
import Sidebar from "./Sidebar";
import { schema } from "../../constants";
import { validateFn } from "./helper";
import {
  changeForm,
  changePage,
  changeNextButtons,
} from "../../modules/form/form.actions";
import { connect } from "react-redux";
import { setInitialValues } from "../../constants";
import { Link } from "react-router-dom";

const Form = (props) => {
  const {
    changeForm,
    changePage,
    changeNextButtons,
    formPage,
    formInfo,
    nextButtons,
  } = props;

  const next = (page) => changePage(page);

  const validate = (values) => {
    let arrDisabledButton = validateFn(
      values,
      nextButtons.step1,
      nextButtons.step2,
      formPage
    );
    changeNextButtons({
      step1: arrDisabledButton[0],
      step2: arrDisabledButton[1],
    });
    changeForm(values);
  };

  const handleSubmit = (values, bag) => {};

  const myResetForm = (values) => {
    changeForm(setInitialValues());
    changeNextButtons({
      step1: true,
      step2: true,
    });
    changePage(0);
  };

  const handleChange = (e) => {};

  const { children } = props;
  const activePage = React.Children.toArray(children)[formPage];
  const isLastPage = formPage === React.Children.count(children) - 1;
  let isButtonDisabled = formPage === 0 ? nextButtons.step1 : nextButtons.step2;

  return (
    <>
      <Grid item sm={4} xs={12}>
        <Sidebar
          values={formInfo}
          page={formPage}
          isDisabledButtonFirst={nextButtons.step1}
          isDisabledButtonSecond={nextButtons.step2}
          next={next}
        />
      </Grid>

      <Grid item sm={8} xs={12} className="formContent">
        <Formik
          validationSchema={schema}
          initialValues={formInfo}
          enableReinitialize={true}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} onChange={handleChange}>
              {React.cloneElement(activePage, { parentState: { ...props } })}

              <div className="buttons">
                {!isLastPage && (
                  <div className="text-center">
                    <div className="line-button-cube">
                      <div className="inner">
                        <button
                          className="btn btn-step front"
                          disabled={isButtonDisabled ? "disabled" : ""}
                        >
                          Продолжить
                        </button>

                        <button
                          onClick={() => next(formPage + 1)}
                          className="btn btn-step back"
                          disabled={isButtonDisabled ? "disabled" : ""}
                        >
                          Продолжить
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isLastPage &&
                  formInfo.distance !== "" &&
                  !(
                    formInfo.filters.includes("Бензин") &&
                    formInfo.filters.includes("Газ")
                  ) && (
                    <div className="extraSection">
                      <div className="saveSection">
                        <Field
                          name={"saveData"}
                          id={"saveData"}
                          component={SaveCheckbox}
                          label="Сохранить результат"
                          className={"form-check-input"}
                        />

                        <div>
                          <div className="line-button-cube">
                            <div className="inner">
                              <button className="btn btn-step front">
                                Добавить новую запись
                              </button>
                              <Link
                                onClick={myResetForm}
                                className="btn btn-step back"
                                to="/"
                              >
                                Добавить новую запись
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </form>
          )}
        </Formik>

        {props.edit && (
          <p className="notice">
            {" "}
            Вы находитесь в режиме редактирование записи <b>#{props.edit}</b>.
            <br /> Не забудьте отметить чекбокс "сохранить", для внесения
            изменений.
          </p>
        )}
      </Grid>
    </>
  );
};

function mapStateToProps({ form }) {
  return {
    formPage: form.formPage,
    formInfo: form.formInfo,
    nextButtons: form.nextButtons,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeForm: (state) => dispatch(changeForm(state)),
    changePage: (page) => dispatch(changePage(page)),
    changeNextButtons: (buttons) => dispatch(changeNextButtons(buttons)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
