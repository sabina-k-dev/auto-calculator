import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <h1>Расчет расхода топлива </h1>
        <nav className="navbar navbar-dark bg-dark mb-5">
          <div className="menuHeader">
            <NavLink exact replace className="menuHeader_item" to="/">
              Главная
            </NavLink>
            <NavLink className="menuHeader_item" to="/contact">
              Контакты
            </NavLink>
            <NavLink className="menuHeader_item" to="/history">
              История
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
