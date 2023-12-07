'use client'
import TituloPagina from '@/app/components/globales/TituloPagina';
import axios from 'axios';
import { useState, useEffect } from 'react';


const PaginaUsuario = ({ params }) => {
  const { usuario } = params;
  const usuarioDecodificado = decodeURIComponent(usuario);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const [customerData, setCustomerData] = useState(null);

  const infoUsuario = async (username, password) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/datos/', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });

      if (response.status === 200) {
        setCustomerData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    infoUsuario(username, password);
  }, []);

  return (
    <>      
      {customerData && (
        <div>
          <TituloPagina contenido={'Usuario ' + usuarioDecodificado} />
          <p>Customer ID: {customerData.customer_id}</p>
          <p>Customer Name: {customerData.customer_name}</p>
          <p>Customer Surname: {customerData.customer_surname}</p>
          <p>Customer DNI: {customerData.customer_dni}</p>
          <p>Date of Birth: {customerData.dob}</p>
          <p>Branch ID: {customerData.branch_id}</p>
          <p>Customer Type: {customerData.customer_type}</p>
        </div>
      )}
    </>
  );
};

export default PaginaUsuario;
// END: be15d9bcejpp