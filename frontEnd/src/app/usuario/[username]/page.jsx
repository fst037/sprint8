'use client'
import { redirect } from "next/navigation";
import axios from 'axios';
import { useState, useEffect } from 'react';


const PaginaUsuario = ({ params }) => {
  const { usuario } = params;
  const usuarioDecodificado = decodeURIComponent(usuario);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const [customerData, setCustomerData] = useState(null);

  const infoCuenta = async (username, password) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes', {
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
    infoCuenta(username, password);
  }, []);

  return (
    <>
      {customerData && (
        <div>
          <h1>Bienvenido {customerData.customer_name}</h1>
          <p>Customer ID: {customerData.customer_id}</p>
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