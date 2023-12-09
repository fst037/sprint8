'use client'
import HistorialCuenta from "../../components/cuentas/HistorialCuenta";
import TituloPagina from "../../components/globales/TituloPagina";
import {useState, useEffect} from "react";
import axios from 'axios';

function PagCuentaEspecifica({params}) {    

    const {especifica} = params;
		const especificaDecodificada = decodeURIComponent(especifica);
		const linkCuenta = 'http://127.0.0.1:8000/api/cuentas/' + especificaDecodificada + '/';

		const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const [cuentaData, setCuentaData] = useState(null);

    const cuenta = async (username, password) => {
        try {
        const response = await axios.get(linkCuenta, {
            headers: {
				Authorization: `Basic ${btoa(`${username}:${password}`)}`
            }
        });

        if (response.status === 200) {
					setCuentaData(response.data);
        }
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        cuenta(username, password);
    }, []);

    return ( 
        <>
            
            <div>
								{cuentaData != null ? 
								<>
									<TituloPagina contenido={'Cuenta ' + cuentaData.tipo + ' ' + cuentaData.iban}/>
									<h2>Saldo Actual: ${cuentaData.balance / 100}</h2>
									<h4>Historial de todos los Movimientos:</h4>
									<HistorialCuenta cuenta={especifica} ult_5={false}/>
								</> : 'No existe la cuenta especificada para este usuario'}
            </div>
        </>
    );
}

export default PagCuentaEspecifica;