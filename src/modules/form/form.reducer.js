import { createReducer } from "redux-act";
import * as formActions from "./form.actions";
import { setInitialValues } from "../../constants";
import { getLocalStorageData } from "../../components/CalculatorForm/helper";

// получаем из хелпер ф-ции
const data = getLocalStorageData();

const initialState = {
  data: data,
  formPage: 0,
  formInfo: setInitialValues(),
  nextButtons: {
    step1: true,
    step2: true,
  },
};

const reducer = {
  [formActions.changeForm]: (state, formInfoValue) => ({
    ...state,
    formInfo: formInfoValue,
  }),
  [formActions.changePage]: (state, formPage) => ({
    ...state,
    formPage: formPage,
  }),
  [formActions.changeNextButtons]: (state, buttons) => ({
    ...state,
    nextButtons: buttons,
  }),
};

export default createReducer(reducer, initialState);
