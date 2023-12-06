import FilaHistorialCuenta from "./FilaHistorialCuenta";
import styles from "./cuentas.module.css";
import historialARS from './historialARS.json'
import historialUSD from './historialUSD.json'


function HistorialCuenta({Cuenta, ult_5}) {
    
    let filas = [];
    let historial = [];

    if (Cuenta == 'ARS') {
        historial = historialARS
    } if (Cuenta == 'USD') {
        historial = historialUSD
    }    
    

    if (ult_5) {
        historial.splice(5);
    }

    historial.forEach(element => {            
        filas.push(<FilaHistorialCuenta elemento={element}/>)
    });

    return ( 
        <ul className={styles.historial}>
            <li>
                <ul className={styles.cabeceraHistorial}>
                    <li className={styles.descripcion}>Descripcion:</li>
                    <li className={styles.cantidad}>Cantidad:</li>
                    <li className={styles.estado}>Estado:</li>
                    <li className={styles.fecha}>Fecha:</li>
                </ul>
            </li>
            {filas.length === 0 ? <li className={styles.filaHistorial}>No hay movimientos</li> : filas}
        </ul>
     );
}

export default HistorialCuenta;