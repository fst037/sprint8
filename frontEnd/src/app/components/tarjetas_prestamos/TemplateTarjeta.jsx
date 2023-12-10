import React from 'react'
import styles from './tarjetas_prestamos.module.css'

const TemplateTarjeta = ({elemento}) => {

  return (
    <ul className={styles.tarjeta}>
      <li>Marca: {elemento.marca}</li>
      <li>Numero: {elemento.numero}</li>
      <li>Tipo: {elemento.tipo}</li>
      <li>Fecha Expiración: {elemento.fechaexpiracion}</li>
      <li>CVV: {elemento.cvv}</li>
    </ul>
  )
}

export default TemplateTarjeta