import Link from 'next/link';
import Image from 'next/image';
import instagram from '../../../app/assets/instagram.svg';
import facebook from '../../../app/assets/facebook.svg';
import twitter from '../../../app/assets/twitter.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-social-icons']}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <Image alt="facebook" src={facebook} width={25} height={25} />
        </a>

        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
        <Image alt="twitter" src={twitter} width={25} height={25}/>
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <Image alt="instagram" src={instagram} width={25} height={25} />
        </a>
      </div>
      <div className={styles['footer-links']}>
        <Link href="/about">Acerca de ITBANK</Link>
        <Link href="/contact">Contacto</Link>
        <Link href="/faq">Preguntas Frecuentes</Link>
      </div>
      <div className={styles['footer-links']}>
        <Link href="/privacy">Política de Privacidad</Link>
        <Link href="/terms">Términos y Condiciones</Link>
      </div>
      <div className={styles.copyright}>
        © 2023 ITBank. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;