import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__inner container">
        <div className="footer__menu">
          <ul className="footer-menu ul-reset">
            <li className="footer-menu__item">
              <a
                className="footer-menu__link footer-menu__link_level_1"
                href="/"
              >
                <span className="footer-menu__linkText">Услуги</span>
              </a>
              <ul className="footer-menu__inner">
                <li className="footer-menu__item">
                  <a className="footer-menu__link" href="/">
                    <span className="footer-menu__linkText">
                      Контроль местоположения
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-menu__item">
              <a
                className="footer-menu__link footer-menu__link_level_1"
                href="/"
              >
                <span className="footer-menu__linkText">Статьи</span>
              </a>
              <ul className="footer-menu__inner">
                <li className="footer-menu__item">
                  <a className="footer-menu__link" href="/">
                    <span className="footer-menu__linkText">
                      Нормы расхода топлива автомобилей
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-menu__item">
              <a
                className="footer-menu__link footer-menu__link_level_1"
                href="/"
              >
                <span className="footer-menu__linkText">Решения</span>
              </a>
              <ul className="footer-menu__inner">
                <li className="footer-menu__item">
                  <a className="footer-menu__link" href="/">
                    <span className="footer-menu__linkText">
                      Строительная техника
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="footer__bottom">
          <div className="footer__bottom_left">
            ItMaster 2021. Администратор сайта:
            <a href="mailto:a@glonassgps.com"> itmaster-soft.com</a>
          </div>
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/itmastersoft/"
              rel="noreferrer"
              target="_blank"
              className="fb-icon"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/ITMasterSoft"
              rel="noreferrer"
              target="_blank"
              className="tw-icon"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/itmastersoft/"
              rel="noreferrer"
              target="_blank"
              className="inst-icon"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/it-master/"
              rel="noreferrer"
              target="_blank"
              className="in-icon"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div className="footer__bottom_agreement">
            <a href="/uploads/docs/policy.pdf" target="_blank">
              Согласие на обработку персональных данных
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
