import React, { useEffect } from "react";
import { Grid, makeStyles, Card } from "@material-ui/core";
import CalculatorForm from "../CalculatorForm/CalculatorForm";
import {
  changeForm,
  changeNextButtons,
  changePage,
} from "../../modules/form/form.actions";
import { connect } from "react-redux";
import { setInitialValues } from "../../constants";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    boxShadow: "none",
    "& input, & select": {
      marginBottom: "20px",
    },
    minHeight: "400px",
    backgroundColor: "transparent",
    color: "#fff",
    textAlign: "left",
    "& p": {
      marginBottom: "20px",
      fontSize: "16px",
      letterSpacing: ".01em",
      lineHeight: "1.2",
      color: "#fff",
    },
  },
});

const Home = (props) => {
  const { params } = props.match;
  const { changeForm, changePage, changeNextButtons, data, formInfo } = props;

  useEffect(() => {
    const editState =
      params.id && data["formikData"].length !== 0
        ? data["formikData"].filter((item) => item.id === Number(params.id))
        : "";
    if (editState[0]) {
      changeForm(editState[0]);
      changeNextButtons({
        step1: false,
        step2: false,
      });
    } else {
      changeForm(setInitialValues());
      changeNextButtons({
        step1: true,
        step2: true,
      });
    }
    changePage(0);
  }, [params.id]);

  const classes = useStyles();

  return (
    <div className="main-content">
      <Card className={`${classes.root} container`}>
        <Grid container>
          <CalculatorForm edit={params.id} formInfo={formInfo} />
        </Grid>
      </Card>
    </div>
  );
};

function mapStateToProps({ form }) {
  return {
    data: form.data,
    formInfo: form.formInfo,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeForm: (state) => dispatch(changeForm(state)),
    changePage: (state) => dispatch(changePage(state)),
    changeNextButtons: (buttons) => dispatch(changeNextButtons(buttons)),
  };
};

//export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
