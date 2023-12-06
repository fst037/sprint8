import HistorialCuenta from "../../components/cuentas/HistorialCuenta";
import TituloPagina from "../../components/globales/TituloPagina";
import saldos from '../../components/cuentas/saldos.json'

function PagCuentaEspecifica({params}) {    

    const {especifica} = params;
    let saldoCuenta = 0;

    // simula fetch de una api que devuelve la informacion cuenta especifica
    saldos.forEach(element => {
        if (element.name == especifica) {
            saldoCuenta = element.value
        }
    });

    return ( 
        <>
            <TituloPagina contenido={'Caja de Ahorro en ' + (especifica == 'ARS' ? 'Pesos' : 'Dolares')}/>
            <div>
                <h2>Saldo: ${parseFloat(saldoCuenta).toFixed(2)}</h2>
                <h4>Historial de todos los Movimientos:</h4>
                <HistorialCuenta Cuenta={especifica} ult_5={false}/>
            </div>
        </>
    );
}

export default PagCuentaEspecifica;