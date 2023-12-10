'use client'
import { useState } from 'react';
import axios from 'axios';
import styles from './staff.module.css'

const OpcionesStaff = () => {

  const [resultado, setResultado] = useState([]);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const listarSucursales = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/sucursales/',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {      
      const newResultado = response.data.map((elemento) => (
        <li>
          <ul className={styles.lineaListado}>
            <li>Numero: {elemento.branch_number}</li>
            <li>Nombre: {elemento.branch_name}</li>
            <li>Direccion: {elemento.branch_address_id}</li>
          </ul>
        </li>
      ));
      setResultado(newResultado);
    })
    .catch((error) => {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.log(error);
    });
  }

  const verPrestamosSucursal = async (nroSucursal) => {
      try {
      const response = await axios.get('http://127.0.0.1:8000/api/prestamos/sucursal/' + nroSucursal + '/', {
          headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
          }
      });

        if (response.status === 200) {
          const newResultado = response.data.map((elemento) => (
            <li>
              <ul className={styles.lineaListado}>
                <li>Numero: {elemento.loan_id}</li>
                <li>Fecha: {elemento.loan_date}</li>
                <li>Cliente: {elemento.customer_id}</li>
                <li>Tipo: {elemento.loan_type}</li>
                <li>Monto: ${elemento.loan_total/100}</li>
              </ul>
            </li>
          ));
          setResultado(newResultado);
        }
      } catch (error) {
        setResultado([<li>
          <ul className={styles.lineaListado}>
            <li>Ocurrio un error: {error.message}</li>
          </ul>
        </li>]);
        console.error(error);
      }
  };

  const verTarjetasCliente = async (nroCliente) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tarjetas/' + nroCliente + '/', {
        headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
    });

      if (response.status === 200) {
        const newResultado = response.data.map((elemento) => (
          <li>
            <ul className={styles.lineaListado}>
              <li>Numero: {elemento.numero}</li>
              <li>Cliente: {elemento.customer_id}</li>
              <li>Fecha Otorgamiento: {elemento.fechaotorgamiento}</li>
              <li>Fecha Expiracion: {elemento.fechaexpiracion}</li>
              <li>CVV: {elemento.cvv}</li>
              <li>Tipo: {elemento.tipo}</li>
              <li>Marca: {elemento.marca}</li>
            </ul>
          </li>
        ));
        setResultado(newResultado);
      }
    }
    catch (error) {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.error(error);
    }
  }

  const verPrestamosCliente = async (nroCliente) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/prestamos/' + nroCliente + '/', {
        headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
    });

      if (response.status === 200) {
        const newResultado = response.data.map((elemento) => (
          <li>
            <ul className={styles.lineaListado}>
              <li>Numero: {elemento.loan_id}</li>
              <li>Fecha: {elemento.loan_date}</li>
              <li>Cliente: {elemento.customer_id}</li>
              <li>Tipo: {elemento.loan_type}</li>
              <li>Monto: ${elemento.loan_total/100}</li>
            </ul>
          </li>
        ));
        setResultado(newResultado);
      }
    }
    catch (error) {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.error(error);
    }
  }

  const solicitarPrestamoCliente = async (nroCliente, tipoPrestamo, montoPrestamo) => {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('loan_type', tipoPrestamo);
    data.append('loan_total', montoPrestamo);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/prestamos/' + nroCliente + '/',
      headers: { 
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      setResultado(
        [<li>
          <ul className={styles.lineaListado}>
            <li>Prestamo creado</li>
          </ul>
        </li>]
      );
    })
    .catch((error) => {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.log(error);
    });
  }

  const anularPrestamo = async (nroPrestamo) => {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('loan_id', nroPrestamo);

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/prestamos/eliminar/' + nroPrestamo + '/',
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      setResultado(
        [<li>
          <ul className={styles.lineaListado}>
            <li>Prestamo eliminado</li>
          </ul>
        </li>]
      );
    })
    .catch((error) => {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.log(error);
    });
  }

  const verDatosCliente = async (nroCliente) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/datos/' + nroCliente + '/'
      , {
        headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
    });

      if (response.status === 200) {        
        setResultado(
          [<li>
            <ul className={styles.lineaListado}>
              <li>Numero: {response.data.customer_id}</li>
              <li>Nombre: {response.data.customer_name}</li>
              <li>Apellido: {response.data.customer_surname}</li>
              <li>DNI: {response.data.customer_DNI}</li>
              <li>Fecha Nacimiento: {response.data.dob}</li>
              <li>Sucursal: {response.data.branch_id}</li>
              <li>Tipo: {response.data.customer_type}</li>
            </ul>
          </li>]
        );
      }
    }
    catch (error) {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.error(error);
    }
  }

  const modificarSucursalCliente = async (nroCliente, nroSucursalNueva) => {
    const FormData = require('form-data');
    let data = new FormData();    
    data.append('branch_id', nroSucursalNueva);

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/datos/' + nroCliente + '/',
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      setResultado(
        [<li>
          <ul className={styles.lineaListado}>
            <li>Sucursal cambiada</li>
          </ul>
        </li>]
      );
    })
    .catch((error) => {
      setResultado([<li>
        <ul className={styles.lineaListado}>
          <li>Ocurrio un error: {error.message}</li>
        </ul>
      </li>]);
      console.log(error);
    });
  }


  return (
    <div>
      <ul>
        <li>
          <button onClick={() => listarSucursales()}>Listar Sucursales</button>
        </li>
        <li>
          <button onClick={() => verPrestamosSucursal(nroSucursalPrestamo.value)}>Ver Prestamos Sucursal</button>
          <input type="number" id="nroSucursalPrestamo" placeholder='Numero Sucursal'/>        
        </li>
        <li>
          <button onClick={() => verTarjetasCliente(nroClienteTarjeta.value)}>Ver Tarjetas Cliente</button>
          <input type="number" id="nroClienteTarjeta" placeholder='Numero Cliente'/>
        </li>
        <li>
          <button onClick={() => verPrestamosCliente(nroClientePrestamoVer.value)}>Ver Prestamos Cliente</button>
          <input type="number" id="nroClientePrestamoVer" placeholder='Numero Cliente'/>
        </li>
        <li>
          <button onClick={() => solicitarPrestamoCliente(nroClientePrestamoSolicitar.value, tipoPrestamo.value, montoPrestamo.value)}>Solicitar Prestamo Cliente</button>          
          <input type="number" id="nroClientePrestamoSolicitar" placeholder='Numero Cliente'/>
          <select id="tipoPrestamo">
            <option value="HIPOTECARIO">Hipotecario</option>
            <option value="PERSONAL">Personal</option>
            <option value="PRENDARIO">Prendario</option>
          </select>
          <input type="number" id="montoPrestamo" placeholder='Monto Prestamo'/>
        </li>
        <li>
          <button onClick={() => anularPrestamo(nroPrestamoAnular.value)}>Anular Prestamo</button>
          <input type="number" id="nroPrestamoAnular" placeholder='Numero Prestamo'/>
        </li>
        <li>
          <button onClick={() => verDatosCliente(nroClienteDatos.value)}>Ver Datos Cliente</button>
          <input type="number" id="nroClienteDatos" placeholder='Numero Cliente'/>
        </li>
        <li>
          <button onClick={() => modificarSucursalCliente(nroClienteSucursalCambiar.value, nroSucursalNuevaCliente.value)}>Modificar Sucursal Cliente</button>
          <input type="number" id="nroClienteSucursalCambiar" placeholder='Numero Cliente'/>
          <input type="number" id="nroSucursalNuevaCliente" placeholder='Numero Sucursal Nueva'/>
        </li>      
      </ul>
      <h3>Resultados:</h3>
      <ul>
        {resultado.length > 0 ? resultado : <li>No hay resultados</li>}
      </ul>
    </div>
  )
}

export default OpcionesStaff