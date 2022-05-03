import React from "react";
import headerLogo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header({ email, onSignOut }) {

  return (
    <div>
      <header className="header">
        <img src={headerLogo} alt="Логотип Место" className="header__logo" />
        <Switch>
          <Route path="/sign-up">
            <Link className="header__link" to="sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__link" to="sign-up">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <div className="header__twin">
              <span className="header__email">{email}</span>
              <Link className="header__link" to="/sign-in" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default Header;
