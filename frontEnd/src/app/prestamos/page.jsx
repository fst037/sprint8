'use client'

import Link from "next/link.js";
import { useState } from "react";
import axios from 'axios';

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


  return (
    <div>
      <h1>Prestamos</h1>
      <button onClick={getPrestamos}>Obtener prestamos</button>
      <ul>
        {prestamos.map((prestamo) => (
          <li key={prestamo.loan_id} >
            <pre>{JSON.stringify(prestamo, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
