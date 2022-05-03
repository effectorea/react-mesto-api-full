import React, { useState } from "react";

function Login ({ onLogin }) {
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
    onLogin(isRegister);
  };

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
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
            maxLength="20"
            id="loginEmail"
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
            id="loginPassword"
            name="password"
            type="password"
            value={isRegister.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="register__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;