'use client'
import MenuLista from "./MenuLista";
import { useState, useEffect } from 'react';
import styles from "./encabezado.module.css";
import icono from '../../../app/assets/menu.svg';
import Image from "next/image";

function Menu() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleMenuClick = () => {
        setMenuAbierto(!menuAbierto);
    };

    const handleDocumentClick = (e) => {
        if (menuAbierto) {
            setMenuAbierto(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', handleDocumentClick);
        }, 50);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };               
    }, [menuAbierto]);

    return (
        <>  
        <div className={styles.menuIcono}>
            <Image alt="Menu" src={icono} onClick={handleMenuClick} width={40} height={40} />
        </div>            
            <MenuLista isOpen={menuAbierto}/>
        </>
    );
}

export default Menu;