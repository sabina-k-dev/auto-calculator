import React from "react";
import Form from "./Form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./Form.css";

const CalculatorForm = (props) => {
  return (
    <Form edit={props.edit}>
      <Step1 />
      <Step2 />
      <Step3 />
    </Form>
  );
};

export default CalculatorForm;
