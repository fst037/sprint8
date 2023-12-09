'use client'
import Link from 'next/link'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { useState } from 'react';
import axios from 'axios';


export default function Page() {
  const [Cards, setCards] = useState([]);
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
      console.error(error);
      alert("Error al obtener las tarjetas");
      console.log(error);
    }
  }

  return (
    <>
      <h1>Tus tarjetas</h1>
      <button onClick={getCards}>Obtener tarjetas</button>
      <ul>
        {Cards.map((Cards) => (
          <li key={Cards.id} >
            <Link href={`/tarjetas/${Cards.id}`}>
              <Cards
                name={username}
                number={Cards.numero}
                expiry={Cards.fechaexpiracion}
                cvc={Cards.cvc}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>          
  )
}