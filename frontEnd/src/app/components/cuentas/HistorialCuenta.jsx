'use client'
import FilaHistorialCuenta from "./FilaHistorialCuenta";
import styles from "./cuentas.module.css";
import {useState, useEffect} from "react";
import axios from 'axios';

function HistorialCuenta({cuenta, ult_5}) {
    
    let filas = [];

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const linkCuenta = 'http://127.0.0.1:8000/api/cuentas/' + cuenta + '/movimientos/';

    const [historialData, setHistorialData] = useState(null);

    const historialCuenta = async (username, password) => {
        try {
        const response = await axios.get(linkCuenta, {
            headers: {
				Authorization: `Basic ${btoa(`${username}:${password}`)}`
            }
        });

        if (response.status === 200) {
			setHistorialData(response.data);
            historialData.forEach(element => {            
                filas.push(<FilaHistorialCuenta elemento={element}/>)
            });
            if (ult_5) {
                historialData.splice(5);
            }
        }
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        historialCuenta(username, password);
    }, []);

    return ( 
        <ul className={styles.historial}>
            <li>
                <ul className={styles.cabeceraHistorial}>
                    <li className={styles.descripcion}>Descripcion:</li>
                    <li className={styles.cantidad}>Cantidad:</li>
                    <li className={styles.fecha}>Fecha:</li>
                </ul>
            </li>
            {historialData != null && historialData.length != 0 ?
                historialData.map((element, index) => (
                    <li key={index}>
                        <ul className={styles.filaHistorial}>
                            <li className={styles.descripcion}>{element.tipo_operacion}</li>
                            <li className={styles.cantidad}>$ {element.monto / 100}</li>
                            <li className={styles.fecha}>{element.hora}</li>
                        </ul>
                    </li>
                ))
            : <li className={styles.filaHistorial}>No hay movimientos</li>}
        </ul>
    );
}

export default HistorialCuenta;