import styles from "./cuentas.module.css";

function FilaHistorialCuenta({elemento}) {

    return ( 
        <li>
            <ul className={styles.filaHistorial}>                
                <li className={styles.descripcion}>{elemento.descripcion}</li>
                <li className={styles.cantidad}>${parseFloat(elemento.cantidad).toFixed(2)}</li>
                <li className={styles.estado}>${parseFloat(elemento.estado).toFixed(2)}</li>
                <li className={styles.fecha}>{elemento.fecha}</li>
            </ul>            
        </li>
    );
}

export default FilaHistorialCuenta;