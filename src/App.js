//import logo from './logo.svg';
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/edit/:id"} component={Home} />
        <Route path={"/history"} component={HistoryPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
