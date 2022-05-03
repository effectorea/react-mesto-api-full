import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [isRegister, setIsRegister] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsRegister({
      ...isRegister,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(isRegister);
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className="register__form"
        name="registrationForm"
        action="#"
      >
        <label htmlFor="email" className="register__label">
          <input
            className="register__input"
            placeholder="Email"
            minLength="3"
            maxLength="40"
            id="registerEmail"
            name="email"
            type="email"
            value={isRegister.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password" className="register__label">
          <input
            className="register__input"
            placeholder="Пароль"
            minLength="3"
            maxLength="15"
            id="registerPassword"
            name="password"
            type="password"
            value={isRegister.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="register__button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
