'use client'
/* const fs = require('fs') */
import { useState } from "react";
import Link from "next/link";
import styles from "./login-singin.module.css";
import cuentas from '../cuentas/cuentas.json'

function RegisterCampos() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    if (isValid) {      
      
      const listaCuentas = cuentas;
      const intentoLogin = {usuario: email, contraseña: password};
/*       const addUserToJSON = (newUser) => {
        const users = require('../cuentas/cuentas.json');
        users.push(newUser);
        const json = JSON.stringify(users);
        fs.writeFileSync('../cuentas/cuentas.json', json);
      } */

      const usuarioEncontrado = listaCuentas.find((cuenta) => {
          return cuenta.usuario === intentoLogin.usuario && cuenta.contraseña === intentoLogin.contraseña;
        });

      if (listaCuentas.includes(usuarioEncontrado)) {              
        alert("Usuario ya registrado");
        setEmail('');
        setPassword('');
      } else {
        listaCuentas.push(intentoLogin);
        alert("Usuario registrado con éxito");
        localStorage.setItem('usuarioActivo', email)
        window.location.href = '/'
        /* addUserToJSON(intentoLogin); */
      }
            
    } else {
    // El correo electrónico no es válido
        alert("El correo electrónico no es válido");
        setPassword('');
        setEmail('');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.labelContrasenia}>Contraseña</label>
        <input
          className={styles.inputContrasenia}
          type="password"
          name="contraseña"
          placeholder="Ingrese una contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.botonFormulario}>Enviar</button>
      </form>
      <p className={styles.textoRegistroCuenta}>
        ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default RegisterCampos;