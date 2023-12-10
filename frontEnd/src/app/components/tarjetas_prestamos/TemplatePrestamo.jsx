import React from 'react'
import styles from './tarjetas_prestamos.module.css'

const TemplatePrestamo = ({elemento}) => {
  return (
    <ul className={styles.prestamo}>
      <li>Customer_id: {elemento.customer_id}</li>
      <li>Tipo: {elemento.loan_type}</li>
      <li>Fecha: {elemento.loan_date}</li>
      <li>Total: ${elemento.loan_total / 100}</li>
    </ul>
  )
}

export default TemplatePrestamo