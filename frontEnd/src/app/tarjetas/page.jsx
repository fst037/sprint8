'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import TemplateTarjeta from '../components/tarjetas_prestamos/TemplateTarjeta';
import styles from '../components/tarjetas_prestamos/tarjetas_prestamos.module.css';


export default function Page() {
  const [cards, setCards] = useState([]);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const getCards = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tarjetas/', {  
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });
      setCards(response.data);
    }
    catch (error) {
      alert("Error al obtener las tarjetas");
      console.log(error);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <h1>Tus tarjetas</h1>
      <ul className={styles.listaTarjetas}>
        {cards.map((card) => (
          <li key={card.id} >
            <TemplateTarjeta elemento={card}/>
          </li>
        ))}
      </ul>
    </>          
  )
}