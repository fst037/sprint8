'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOperations = () => {
    const [loans, setLoans] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        // Fetch loans for a specific branch
        axios.get('/api/loans/branch/{branchId}')
            .then(response => {
                setLoans(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch credit cards for a specific client
        axios.get('/api/credit-cards/client/{clientId}')
            .then(response => {
                setCreditCards(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch all branches
        axios.get('/api/branches')
            .then(response => {
                setBranches(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Function to generate a loan request for a client
    const generateLoanRequest = (clientId) => {
        axios.post('/api/loans', { clientId })
            .then(response => {
                console.log('Loan request generated successfully');
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Function to cancel a loan request for a client
    const cancelLoanRequest = (loanId) => {
        axios.delete(`/api/loans/${loanId}`)
            .then(response => {
                console.log('Loan request cancelled successfully');
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Function to modify a client's address
    const modifyClientAddress = (clientId, newAddress) => {
        axios.put(`/api/clients/${clientId}/address`, { newAddress })
            .then(response => {
                console.log('Client address modified successfully');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Admin Operations</h2>
            <ul>
                <li>
                    Obtener monto de préstamos de una sucursal
                    <button onClick={() => fetchLoansByBranch(branchId)}>Fetch Loans</button>
                </li>
                <li>
                    Obtener tarjetas asociadas a un cliente
                    <button onClick={() => fetchCreditCardsByClient(clientId)}>Fetch Credit Cards</button>
                </li>
                <li>
                    Generar una solicitud de préstamo para un cliente
                    <button onClick={() => generateLoanRequest(clientId)}>Generate Loan Request</button>
                </li>
                <li>
                    Anular solicitud de préstamo de cliente
                    <button onClick={() => cancelLoanRequest(loanId)}>Cancel Loan Request</button>
                </li>
                <li>
                    Modificar dirección de un cliente
                    <button onClick={() => modifyClientAddress(clientId, newAddress)}>Modify Client Address</button>
                </li>
                <li>
                    Listado de todas las sucursales
                    <button onClick={() => fetchAllBranches()}>Fetch All Branches</button>
                </li>
            </ul>
        </div>
    );
};

export default AdminOperations;
