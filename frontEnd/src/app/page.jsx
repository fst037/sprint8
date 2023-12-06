import Link from 'next/link';
import Image from 'next/image';
import tarjeta from './assets/tarjeta.svg';
import pago from './assets/pago.svg';
import qr from './assets/qr.svg';
import support from './assets/support.svg';
import "../../styles/globals.css"

export default async function Home() { 

  return (
    <>
    <main>
      <section className="banner">
        <div className="banner-img">
          <img src="https://img.freepik.com/vector-premium/banca-linea-concepto-isometrico-diseno-plano-moderno-banco-electronico-concepto-personas-plantilla-pagina-destino-ilustracion-isometrica-conceptual-diseno-web-grafico_709513-31.jpg" alt="banner" />
        </div>
        <div className="banner-text">
          <h1>Prestamos a tasa cero</h1>
          <p>¡Solicitá tu préstamo en 3 simples pasos!</p>
          <Link href= "/prestamos"> <button className="btn-banner">Quiero saber más</button></Link>
        </div>
      </section>
      <section className="dash-boards">
          <div className="dashboard-item item">
          <div class="text-content">
            <h2>Obtené tu tarjeta</h2>
            <p> Adquirí tu tarjeta de débito VISA de Itbank de forma sencilla y comienza a disfrutar de todas las ventajas que ofrece.</p>
            <Link href= "/"> <button className="btn-banner">Conocer más</button> </Link></div>
         <Image alt="tarjeta" src={tarjeta}/></div>
          <div className="dashboard-item item2">
          <div class="text-content">
            <h2>Transferencias Instantáneas</h2>
            <p>Facilitando tus transacciones de manera rápida y segura.</p>  
            <Link href= "/transferencias"> <button className="btn-banner item2">Conocer más</button> </Link></div>     
             <Image alt="pago" src={pago} /></div>
          <div className="dashboard-item item3">
          <div class="text-content">
            <h2>Paga con QR</h2>
            <p>Aprovecha la velocidad y comodidad al realizar tus pagos utilizando códigos QR.</p> 
            <Link href= "/qr"> <button className="btn-banner item3">Conocer más</button> </Link></div>     
            <Image alt="qr" src={qr} />
          </div>
          <div className="dashboard-item item4">
          <div class="text-content">
            <h2>Atención disponible 24/7</h2>
            <p>Comunícate con nuestro equipo de soporte en cualquier momento y recibe asistencia instantánea.</p>
            <Link href= "/contact"> <button className="btn-banner item4">Conocer más</button> </Link></div>     
            <Image alt="support" src={support} />
          </div>
      </section>
    </main>
    </>
  )
}
