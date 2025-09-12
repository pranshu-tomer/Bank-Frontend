import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    // const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    // const [userData, setUserData] = useState(false)
    // const [accounts,setAccounts] = useState([])
    // const [transactions,setTransactions] = useState([])
    // const [transactionTotal,setTransactionTotal] = useState(false)
    
    // const loadUserProfileData = async () => {
    //     try {
    //         const { data } = await axios.get(backendUrl + '/api/user/dashboard', {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         if (data?.success) {
    //             setAccounts(data.data.accounts)
    //             setTransactions(data.data.recentTransactions)
    //             setUserData({
    //                 id : data.data.userId,
    //                 name : data.data.name,
    //                 email : data.data.email,
    //                 crn : data.data.crn
    //             })
    //             setTransactionTotal(data.data.totals)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getDoctosData()
    // }, [])

    // useEffect(() => {
    //     if (token) {
    //         loadUserProfileData()
    //     }
    // }, [token])

    const value = {
        // doctors, getDoctosData,
        // currencySymbol,
        backendUrl,
        token, setToken,
        // userData, setUserData, loadUserProfileData,
        // accounts,setAccounts,
        // transactions,setTransactions,
        // transactionTotal,setTransactionTotal
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider