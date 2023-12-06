'use client'
import tarjetas from '../api/listaTarjetas'
import Link from 'next/link'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'


export default function Page() {
  return (
    <>
      <h1>Tus tarjetas</h1>
      <Link href={`/tarjetas/${Cards.id}`}>
      <Cards
        name="John Smith"
        number="5555 4444 3333 1111"
        expiry="10/20"
        cvc="737"
      />
      </Link>
      <hr />
      <Link href={`/tarjetas/${Cards.id}`}>
      <Cards
            name="John Smith"
            number="4111 1111 1111 1111"
            expiry="10/20"
            cvc="737"
          />
      </Link>
    </>          
  )
}
