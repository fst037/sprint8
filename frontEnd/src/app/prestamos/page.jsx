'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from '../components/tarjetas_prestamos/tarjetas_prestamos.module.css';
import TemplatePrestamo from "../components/tarjetas_prestamos/TemplatePrestamo";

export default function page() {
  const [prestamos, setPrestamos] = useState([]);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const getPrestamos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/prestamos/', {  
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });
      if (response.status === 200) {
        setPrestamos(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener los prestamos");
      console.log(error);
    }
  };

  useEffect(() => {
    getPrestamos();
  }, []);


  return (
    <>
      <h1>Prestamos</h1>
      <ul className={styles.listaPrestamos}>
        {prestamos.map((prestamo) => (
          <li key={prestamo.loan_id} >
            <TemplatePrestamo elemento={prestamo} />
          </li>
        ))}
      </ul>
    </>
  );
}
