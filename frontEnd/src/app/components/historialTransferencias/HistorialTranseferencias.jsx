import React from 'react';
import styles from './historialTransferencias.module.css';

const HistorialTranseferencias = () => {
    const transactions = [
        { id: 1, date: '2021-09-01', amount: 100, to: 'Cuenta 1' },
        { id: 2, date: '2021-09-02', amount: 200, to: 'Cuenta 2' },
        { id: 3, date: '2021-09-03', amount: 300, to:  'Cuenta 3'},
    ];

    return (
        <div className={styles.container}>
            <h3>Historial de transferencias</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Enviado a</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.to}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistorialTranseferencias;
