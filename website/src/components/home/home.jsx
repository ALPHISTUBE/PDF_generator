'use client'
import React, { useState } from 'react'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        amount: '',
        date: '',
        description: '',
        type: ''
    })
    const [transactions, setTransactions] = useState([])

    const openModal = () => {
        const modal = document.getElementById('transaction-modal')
        if (modal) {
            modal.showModal()
        }
    }

    const closeModal = () => {
        const modal = document.getElementById('transaction-modal')
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setTransactions([...transactions, formData])
        closeModal()
    }

    const saveTransaction = () => {
        
    }

    return (
        <div className="p-4 bg-[#f9f9f8] min-h-screen">
            <div className='flex justify-between items-center'>
                <p className="font-bold text-black text-2xl">Create Transaction</p>
                <div>
                    <button 
                        className='btn sm:btn-sm md:btn-md lg:btn-lg bg-[#7F56D9] hover:bg-[#6a47b6] text-white mr-5'
                        onClick={() => document.getElementById('my_modal_2').showModal()}
                    >
                        Create
                    </button>
                    <button 
                        className='btn sm:btn-sm md:btn-md lg:btn-lg border-2 bg-[#fafafa] hover:bg-[#ececec] text-black'
                        onClick={saveTransaction}
                    >
                        Save
                    </button>
                </div>
            </div>
            <dialog className="modal" id='my_modal_2'>
                <div className="modal-box bg-[#f9f9f8] text-black">
                    <form onSubmit={handleSubmit} className='flex m-2 flex-col'>
                        <label className='mb-2'>
                            Date:
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='mb-2'>
                            Description:
                            <input 
                                type="text" 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='mb-2'>
                            Type:
                            <input 
                                type="text" 
                                name="type" 
                                value={formData.type} 
                                onChange={handleChange} 
                                className='input input-bordered w-full'
                            />
                        </label>
                        <label className='mb-2'>
                            Amount:
                            <input 
                                type="number" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={handleChange} 
                                className='input input-bordered w-full'
                            />
                        </label>
                        <button type="submit" className='btn bg-[#7F56D9] hover:bg-[#6a47b6] text-white mt-4'>
                            Submit
                        </button>
                    </form>
                </div>
                <form method='dialog' className="modal-backdrop">
                    
                </form>
            </dialog>
            <table className="table w-full mt-4 text-black">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-[#f3c331]">
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home