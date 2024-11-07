'use client'
import React, { useState, useEffect } from 'react'
import { saveTransaction } from '@/components/home/api/'
const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        report_name: '',
        date: '',
        merchant: '',
        category: '',
        status: '',
        way: '',
        amount: 0.0,
        attachment: []
    })
    const [transactions, setTransactions] = useState([])

    const openModal = () => {
        const modal = document.getElementById('transaction-modal')
        if (modal) {
            modal.showModal()
        }
    }

    const closeModal = () => {
        const modal = document.getElementById('my_modal_2')
        if (modal) {
            modal.close()
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const [pdfFile, setpdfFile] = useState(null)
    const fetchTransactions = async () => {
        try {
            const savedTransactions = await saveTransaction(transactions)
            setpdfFile(savedTransactions)
        } catch (error) {
            console.error('Error fetching transactions:', error)
        }
    }
    
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const attachmentsBase64 = await Promise.all(
            formData.attachment.map(file => convertToBase64(file))
        )
        const updatedFormData = {
            ...formData,
            attachment: attachmentsBase64,
            status: paidStatus.find(status => status.id === parseInt(formData.status))?.name,
            way: paidThrough.find(way => way.id === parseInt(formData.way))?.name,
            merchant: merchantList.find(merchant => merchant.id === parseInt(formData.merchant))?.name
        }
        setTransactions([...transactions, updatedFormData])
        closeModal()
    }

    const [merchantList, setMerchantList] = useState([
        {
            id: 1,
            name: 'Merchant 1'
        },
        {
            id: 2,
            name: 'Merchant 2'
        }
    ])

    const [paidStatus, setPaidStatus] = useState([
        {
            id: 1,
            name: 'Paid'
        },
        {
            id: 2,
            name: 'Due'
        }
    ])

    const [paidThrough, setPaidThrough] = useState([
        {
            id: 1,
            name: 'Cash'
        },
        {
            id: 2,
            name: 'Bank'
        }
    ])

    return (
        <div className='min-h-screen bg-white min-w-screen flex flex-col items-center'>
            <div className="p-4 bg-[#f8f8f8] min-h-screen mx-[50px] min-w-[1820px] max-w-[2000px]">
                <div className='flex justify-between items-center'>
                    <p className="font-bold text-black text-2xl">Create Transaction</p>
                    <div>
                        <button 
                            className='btn btn-sm bg-[#7F56D9] hover:bg-[#6a47b6] border-stone-300 text-white mr-5'
                            onClick={() => document.getElementById('my_modal_2').showModal()}
                        >
                            <p className='py-2 px-1'>Add Transaction</p>
                        </button>
                        <button 
                            className='btn btn-sm border-2 border-stone-300 bg-[#fafafa] hover:bg-[#ececec] text-black'
                            onClick={fetchTransactions}
                        >
                            <p className='py-2 px-1'>Save Transaction</p>
                        </button>
                    </div>
                </div>
                <dialog className="modal" id='my_modal_2'>
                    <div className="modal-box bg-[#f9f9f8] text-black">
                        <form onSubmit={handleSubmit} className='flex m-2 flex-col'>
                        <div className='grid grid-cols-1 border-2 bg-slate-200 border-slate-300 rounded-lg py-2 mb-2' ><p className='ml-3 text-slate-400' >Outlet</p></div>
                        <div className='justify-center gap-2 grid grid-cols-2'>
                            <label className='mb-2 text-black'>
                                Report Name
                                <input 
                                    type="text" 
                                    name="report_name" 
                                    value={formData.report_name} 
                                    onChange={handleChange} 
                                    className='input input-bordered w-full bg-white border-slate-300 mt-2'
                                    placeholder='Enter Report Name'
                                />
                            </label>
                            <label className='mb-2'>
                                Date
                                <input 
                                    type="date" 
                                    name="date" 
                                    value={formData.date} 
                                    onChange={handleChange} 
                                    className='input input-bordered w-full bg-white border-slate-300 mt-2 date:text-black'
                                />
                            </label>
                        </div>
                        <label className="mb-2">
                        Merchant
                            <div>
                                <select
                                name="merchant"
                                value={formData.merchant}
                                onChange={handleChange}
                                className="w-full bg-white border-slate-300 border-2 mt-2 py-3"
                                required
                                >
                                <option className='ml-2' value="">Select an Merchant</option>
                                {merchantList?.map((merchant) => (
                                    <option className='ml-2 py-2' key={merchant.id} value={merchant.id}>
                                    {merchant.name}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </label>
                        <label className='mb-2'>
                            Category:
                            <input 
                                type="text" 
                                name="category" 
                                value={formData.category} 
                                onChange={handleChange} 
                                className='input input-bordered w-full bg-white border-slate-300 mt-2'
                                placeholder='Enter Category'
                            />
                        </label>
                        <div className='justify-center gap-4 grid grid-cols-2' >
                            <label className="mb-2">
                            Paid Status
                                <div>
                                    <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-white border-slate-300 border-2 mt-2 py-3"
                                    required
                                    >
                                    <option className='ml-2' value="">Select an Status</option>
                                    {paidStatus?.map((status) => (
                                        <option className='ml-2 py-2' key={status.id} value={status.id}>
                                        {status.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </label>
                            <label className="mb-2">
                            Paid Through
                                <div>
                                    <select
                                    name="way"
                                    value={formData.way}
                                    onChange={handleChange}
                                    className="w-full bg-white border-slate-300 border-2 mt-2 py-3"
                                    required
                                    >
                                    <option className='ml-2' value="">Select an Through</option>
                                    {paidThrough?.map((way) => (
                                        <option className='ml-2 py-2' key={way.id} value={way.id}>
                                        {way.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </label>
                        </div>
                        <label className='mb-2'>
                            Amount
                            <input 
                                type="number" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={handleChange} 
                                className='input input-bordered w-full bg-white border-slate-300 mt-2'
                                placeholder='Enter Amount'
                            />
                        </label>
                        <label className='mb-2'>
                            Attachment
                            <input 
                                type="file" 
                                name="attachment" 
                                multiple 
                                onChange={(e) => {
                                    const files = Array.from(e.target.files)
                                    setFormData({
                                        ...formData,
                                        attachment: files
                                    })
                                }} 
                                className='file-input file-input-bordered w-full bg-white'
                            />
                        </label>
                        <div className='flex flex-wrap'>
                            {formData.attachment && formData.attachment.map((file, index) => (
                                <img 
                                    key={index} 
                                    src={URL.createObjectURL(file)} 
                                    alt={`attachment-${index}`} 
                                    className='w-24 h-24 m-2 object-cover'
                                />
                            ))}
                        </div>
                            <button type="submit" className='btn bg-[#7F56D9] hover:bg-[#6a47b6] text-white mt-4' onClick={closeModal}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <form method='dialog' className="modal-backdrop">
                        <button></button>
                    </form>
                </dialog>
                <div className='border-2 border-stone-300 rounded-tl-xl rounded-tr-xl mt-4'>
                    <table className="table w-full">
                        <thead className='bg-slate-100'>
                            <tr className='text-stone-500 border-stone-300'>
                                <th className='rounded-tl-xl'>Date</th>
                                <th>Report Name</th>
                                <th>Merchant</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Way</th>
                                <th className='rounded-tr-xl'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions && transactions.map((transaction, index) => (
                                <tr key={index} className="hover:bg-[#b3a6d1] text-black border-stone-300">
                                    <td>{transaction.date}</td>
                                    <td>{transaction.report_name}</td>
                                    <td>{transaction.merchant}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.way}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {pdfFile && (
                    <div className="flex flex-col items-center mt-4">
                        <div className='w-full'>
                            <a href={pdfFile} download="transaction.pdf" className="btn bg-[#7F56D9] hover:bg-[#6a47b6] border-stone-300 text-white mb-4">
                                Download PDF
                            </a>
                        </div>
                        <iframe 
                            src={pdfFile} 
                            width="100%" 
                            height="600px" 
                            className="border-2 border-stone-300 rounded-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home