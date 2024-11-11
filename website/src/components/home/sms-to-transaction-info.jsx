'use client'
import React, { useState } from 'react'
import { getTransactionFromSMS } from '@/components/home/api'

const SmsToTransactionInfo = () => {
    const [sms, setSms] = useState('')
    const [transactionInfo, setTransactionInfo] = useState({
        data: {
            date: "",
            ac: null,
            currency: "",
            type: null,
            merchant: null,
            bank: null,
            amount: 0,
            balance: null
        },
        message: ""
    })

    const fetchTransactions = async () => {
        const data = await getTransactionFromSMS(sms)
        setTransactionInfo(data)
        console.log(transactionInfo)
    }

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg min-h-screen">
            <div className='flex'>
                <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                    value={sms} 
                    onChange={(e) => setSms(e.target.value)} 
                    placeholder="Enter SMS here" 
                />
                <button 
                    className="w-full bg-blue-500 text-white p-2 rounded-md mb-4 hover:bg-blue-600" 
                    onClick={fetchTransactions}
                >
                    Fetch Transaction Info
                </button>
            </div>
            <table className="bg-gray-100 p-4 rounded-md text-black w-full">
                <tbody>
                        <tr className='grid grid-cols-2 bg-stone-500 text-white'>
                            <td className="font-bold text-center">Info</td>
                            <td>
                                <div className={`p-2 text-center`}>
                                    Value
                                </div>
                            </td>
                        </tr>
                    {Object.entries(transactionInfo.data).map(([key, value]) => (
                        <tr key={key} className='grid grid-cols-2'>
                            <td className="font-bold text-center">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                            <td>
                                <p className={`text-center rounded-md ${value ? 'bg-green-200' : 'bg-red-200'}`}>
                                    {value !== null && value !== "" ? value : 'N/A'}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactionInfo.message && (
                <div className="mt-4 p-2 bg-yellow-200 text-yellow-800 rounded-md">
                    {transactionInfo.message}
                </div>
            )}
        </div>
    )
}

export default SmsToTransactionInfo