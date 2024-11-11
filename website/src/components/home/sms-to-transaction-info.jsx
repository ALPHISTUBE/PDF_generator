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
        <div className="p-6 mx-auto bg-white shadow-lg rounded-lg min-h-screen max-w-4xl">
            <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={sms} 
                    onChange={(e) => setSms(e.target.value)} 
                    placeholder="Enter SMS here" 
                />
                <button 
                    className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors" 
                    onClick={fetchTransactions}
                >
                    Fetch Transaction Info
                </button>
            </div>
            <table className="bg-gray-50 p-4 rounded-md text-black w-full shadow-sm">
                <tbody>
                    <tr className='grid grid-cols-2 bg-blue-500 text-white'>
                        <td className="font-bold text-center py-2">Info</td>
                        <td className="font-bold text-center py-2">Value</td>
                    </tr>
                    {Object.entries(transactionInfo.data).map(([key, value]) => (
                        <tr key={key} className='grid grid-cols-2'>
                            <td className="font-semibold text-center py-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                            <td className="text-center py-2">
                                <span className={`inline-block px-2 py-1 rounded-md ${value ? 'bg-green-200' : 'bg-red-200'}`}>
                                    {value !== null && value !== "" ? value : 'N/A'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactionInfo.message && (
                <div className="mt-4 p-3 bg-yellow-200 text-yellow-800 rounded-md">
                    {transactionInfo.message}
                </div>
            )}
        </div>
    )
}

export default SmsToTransactionInfo