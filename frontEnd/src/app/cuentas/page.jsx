'use client'

import HistorialCuenta from "../components/cuentas/HistorialCuenta";
import TituloPagina from "../components/globales/TituloPagina";
import Link from "next/link";
import styles from "../components/cuentas/cuentas.module.css";
import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const pageCuentas = () => {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const [cuentasData, setCuentasData] = useState(null);

    const cuentas = async (username, password) => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/api/cuentas/', {
            headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
            }
        });

        if (response.status === 200) {
					setCuentasData(response.data);
        }
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        cuentas(username, password);
    }, []);


    return ( 
        <>
            <TituloPagina contenido={'Cuentas'}/>
						<div>
							{cuentasData != null ? 
								<div className={styles.listaCuentas}>
									{cuentasData.map((cuenta, index) => (
										
										<>
											<Link key={index} href={"/cuentas/" + cuenta.account_id} className={styles.linkCuenta}>
												<li>{cuenta.tipo}</li>
												<li>$ {cuenta.balance / 100}</li>											
												<li>{cuenta.iban}</li>
											</Link>
											<h4 style={{padding: '0px 15px'}}>Ultimos 5 Movimientos:</h4>
											<HistorialCuenta cuenta={cuenta.account_id} ult_5={true}/>
										</>
									))}
								</div>								
								: 
								<h1> No hay cuentas </h1>}
							
						</div>
        </>
    );
}

export default pageCuentas