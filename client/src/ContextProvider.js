import { useState, createContext } from "react";
import TransactionContext from "./transactionContext";

const TransactionContextProvider = ({ children }) => {
    const [transactionContext, setTransactionContext] = useState(" ");
   
    return (
        <TransactionContext.Provider value={{ transactionContext, setTransactionContext }}>
            { children }
        </TransactionContext.Provider>
    );
}

export default TransactionContextProvider;