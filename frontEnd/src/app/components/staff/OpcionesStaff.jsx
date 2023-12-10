'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OpcionesStaff = () => {


    
    const[sucursales, setSucursales] = useState([]);

    const getSucursales = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/sucursales/',{
        username,
        password
        });
            setSucursales(response.data);
        }
        catch (error) {
            console.error(error);
        }

    return(
        <>
        <button onClick={getSucursales} ></button>
        <div>
            {sucursales.map((sucursal) => (
                <div key={sucursal.id}>
                    <h3>{sucursal.nombre}</h3>
                </div>
            ))}
        </div>
        
        </>
    )
    }
}

export default OpcionesStaff;
