'use client'

import styles from './login-singin.module.css';
import { useState } from 'react';
import Link from 'next/link';
import cuentas from '../cuentas/cuentas.json'
import { redirect, usePathname } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/router';

function LoginCampos() {

  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');



  const login = async (username, password) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api-auth/', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });

      if (response.status === 200) {
        // Store user credentials in local storage or cookie
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        router.push('/usuario/' + username);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llamar a la función login
    await login(username, password);
  };
  

  return (
    <div className={styles.contenedorFormulario}>
      <form onSubmit={handleSubmit} className={styles.formularioLogin}>
        <div className={styles.registrarse}>
          <h3>INICIAR SESION</h3>
        </div>
        <label className={styles.labelUsuario}>Usuario</label>
        <input
          className={styles.inputUsuario}
          type="text"
          name="usuario"
          placeholder="Ingrese un usuario"
          value={username}
          onChange={(e) => setUser(e.target.value)}
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
        ¿No tienes una cuenta? <Link href="/register">¡Crea tu cuenta ahora!</Link>
      </p>
    </div>
  );
}

export default LoginCampos;