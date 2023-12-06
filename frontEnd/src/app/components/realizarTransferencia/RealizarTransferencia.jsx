'use client'

import React, { useState } from 'react';
import styles from './realizarTrasnferencia.module.css';

const RealizarTransferencia = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountSelect = (account) => {
        setSelectedAccount(account);
    };

    const handleTransferClick = () => {
        alert(`Transfering from ${selectedAccount.name}`);
    };

    const accounts = [
        { id: 1, name: 'Account 1', balance: 1000 },
        { id: 2, name: 'Account 2', balance: 500 },
        { id: 3, name: 'Account 3', balance: 2500 },
    ];

    return (
        <div className={styles.container}>
            <h2>Select an account to transfer from:</h2>
            <ul className={styles.accountList}>
                {accounts.map((account) => (
                    <li
                        key={account.id}
                        className={selectedAccount === account ? styles.selectedAccount : ''}
                        onClick={() => handleAccountSelect(account)}
                    >
                        {account.name} - Balance: {account.balance}
                    </li>
                ))}
            </ul>
            <button
                className={styles.transferButton}
                disabled={!selectedAccount}
                onClick={handleTransferClick}
            >
                Make Transfer
            </button>
        </div>
    );
};

export default RealizarTransferencia;
