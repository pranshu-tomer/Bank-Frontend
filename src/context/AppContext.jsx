import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    // const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [accounts, setAccounts] = useState([])
    const [accountOptions, setAccountOptions] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [transactions,setTransactions] = useState([])
    // const [accounts,setAccounts] = useState([])
    // const [transactionTotal,setTransactionTotal] = useState(false)
    
    const loadAccountsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/accounts', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data?.success) {
                setAccounts(data.accounts)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadAccountOptionsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/accounts/options', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data?.success) {
                setAccountOptions(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data?.success) {
                setUserData(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadTransactionData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/transactions?size=10', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data?.success) {
                setTransactions(data.transactions)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            loadAccountsData()
            loadAccountOptionsData()
            loadUserData()
            loadTransactionData()
        }
    }, [token])

    const value = {
        // doctors, getDoctosData,
        // currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        accounts,setAccounts,
        accountOptions,setAccountOptions,
        transactions,setTransactions,
        // transactionTotal,setTransactionTotal
        loadAccountsData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider