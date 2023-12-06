'use client'

import Link from "next/link"
import styles from './Navbar.module.css'
import Menu from "./Menu"
import OpcionesDeUsuario from "./OpcionesDeUsuario"

const Navbar = () => {
  
  const usuario = typeof window !== 'undefined' ? "/usuario/" + localStorage.getItem('usuarioActivo') : "/login";
  
  return (
    <>
      <nav className={styles.navBar}>
        <div>
          <Menu/>
        </div>

        <div className={styles.itbankLogo}>
          <Link href="/" className={styles.itbankboton}>
              <h2 className={styles.navBarLogo}>ITBANK</h2>
          </Link>
        </div>   

        <div>
          <OpcionesDeUsuario />
        </div>
      </nav>
    </>
  )
}

export default Navbar