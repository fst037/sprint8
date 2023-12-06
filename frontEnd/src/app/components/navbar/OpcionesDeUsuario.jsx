'use client'
import { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import Link from "next/link";

function OpcionesLista({ isOpen }) {
  let claseOpciones = isOpen ? styles.opcionesAbierto : styles.opciones;

  const handleIrUsuario = () => {
        
  }

  const handleCerrarSesion = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.href = '/login' // se soluciono asi para que se recargue la pagina y el layout pueda redireccionar correctamente cuando no se esta logueado
  }

  return (
    <>
      <ul className={claseOpciones}>
        <li className={styles.navBarListElem}>
          <Link href={typeof window !== 'undefined' && localStorage.getItem('usuarioActivo') != undefined ? '/usuario/' + localStorage.getItem('usuarioActivo') : '/usuario'} className={styles.menuBoton} onClick={handleIrUsuario}>
            Mi Perfil
          </Link>
        </li>
        <li className={styles.navBarListElem}>
          <button className={styles.menuBoton} onClick={handleCerrarSesion} >
            Cerrar Sesión
          </button >
        </li>
      </ul>
    </>
  );
}

function OpcionesDeUsuario() {
  const [opcionesAbierto, setOpcionesAbierto] = useState(false);

  const handleOpcionesClick = () => {
    setOpcionesAbierto(!opcionesAbierto);
  };

  const handleDocumentClick = (e) => {
    if (opcionesAbierto) {
      setOpcionesAbierto(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
    }, 50);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [opcionesAbierto]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        className={styles.iconoUsuario}
        onClick={handleOpcionesClick}
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
      <OpcionesLista isOpen={opcionesAbierto} />
    </>
  );
}

export default OpcionesDeUsuario;