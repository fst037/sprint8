'use client'
/* const fs = require('fs') */
import { useState } from "react";
import Link from "next/link";
import styles from "./login-singin.module.css";
import axios from 'axios';

function RegisterCampos() {
  const [username, setUsername] = useState("");
  const [customer, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }


    try {
      const response = await axios.post('http://127.0.0.1:8000/api-auth/register/', {
        username,
        customer: Number(customer),
        password,
      });

      if (response.status === 201) {
        alert("Usuario registrado con éxito");
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('is_staff', response.data.is_staff);  
        window.location.href = '/';
        redirect('/');     
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.contenedorFormulario}>
      <form onSubmit={handleSubmit} className={styles.formularioLogin}>
        <div className={styles.registrarse}>
          <h3>REGISTRARSE</h3>
        </div>
        <label className={styles.labelUsuario}>Usuario</label>
        <input
          className={styles.inputUsuario}
          type="text"
          name="usuario"
          placeholder="Ingrese un usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className={styles.labelUsuario}>Customer id:</label>
        <input
          className={styles.inputUsuario}
          type="number"
          value={customer}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <label className={styles.labelContrasenia}>Contraseña</label>
        <p>Your password can’t be too similar to your other personal information.</p>
        <p>Your password can’t be entirely numeric.</p>
        <p>Your password can’t be a commonly used password.</p>
        <p>Your password must contain at least 8 characters.</p>
        <input
          className={styles.inputContrasenia}
          type="password"
          name="contraseña"
          placeholder="Ingrese una contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={styles.labelContrasenia}>Confirmación de contraseña</label>
        <input
          className={styles.inputContrasenia}
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        {passwordError && <p className={styles.passwordError}>{passwordError}</p>}

        <button type="submit" className={styles.botonFormulario}>Registrar</button>
      </form>
      <p className={styles.textoRegistroCuenta}>
        ¿Ya tienes una cuenta? <Link href="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default RegisterCampos;
