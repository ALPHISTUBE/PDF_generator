import Image from 'next/image'
import React from 'react'
import Ai from '../../../public/svg/Ai'
import Toggle from '../common/toggle'
import Notification from '../../../public/svg/Notification'
import Accounts from '../../../public/svg/Accounts'
import Avator from '../../../public/image/avatar.png'
import dollar from '../../../public/image/expenses/dollar.png'
import BookOpen from '../../../public/svg/BookOpen'
import Link from 'next/link'

const ExpenseRecord = () => {
return (
    <div className='bg-white h-screen'>
        <div className='flex justify-between items-center py-7'>
                <h1 className='text-3xl ml-10 font-bold text-black'>Records</h1>
                <div className='flex items-center'>
                    <div className='flex mr-5 border-2 rounded-xl py-2 px-3 items-center'>
                        <Ai className="mr-2"/>
                        <p className="mr-2 text-black">Ai Categorization</p>
                        <Toggle className="mr-2"/>
                    </div>
                    <Notification className="w-6 h-6"/>
                    <Image className='ml-5 w-10 h-10' src={Avator} alt="Avatar"/>
                </div>
        </div>
        <div className='flex flex-col items-center text-black mt-36'>
            <Image className="w-auto h-auto" src={dollar}/>
            <h1 className='card-title'>No Record Yet</h1>
            <p className='text-[#505050]' >You can awls change future</p>
        </div>
        <div className='mt-40'>
            <div className='flex justify-between mx-10 bg-[#ececec] py-10 rounded-xl'>
                <Link className="card card-compact bg-white border-2 border-[#b8b8b8] w-96 mx-5" href="/">
                    <div>
                        <div className="card-body flex flex-col items-center text-[#4d4d4d]">
                            <Image className="mt-1" src={dollar}/>
                            <div className='flex flex-col items-center text-center'>
                                <p className="text-base font-bold mb-3 text-[#2c2c2c]">Create Expense Record</p>
                                <p className='mx-5 mb-2'>Import transaction details from a CSV format</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className="card card-compact bg-white border-2 border-[#b8b8b8] w-96 mx-5" href="/">
                    <div>
                        <div className="card-body flex flex-col items-center text-[#4d4d4d]">
                            <Image className="mt-1" src={dollar}/>
                            <div className='flex flex-col items-center text-center'>
                                <p className="text-base font-bold mb-3 text-[#2c2c2c]">Create Bill Record</p>
                                <p className='mx-5 mb-2'>Enter manual transaction Income or Expense</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className="card card-compact bg-white border-2 border-[#b8b8b8] w-96 mx-5" href="/">
                    <div>
                        <div className="card-body flex flex-col items-center text-[#4d4d4d]">
                            <Image className="mt-1" src={dollar}/>
                            <div className='flex flex-col items-center text-center'>
                                <p className="text-base font-bold mb-3 text-[#2c2c2c]">Scan Receipt</p>
                                <p className='mx-5 mb-2'>Scan Receipt with app or Upload a receipt</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className='flex flex-col items-center mt-12'>
            <h1 className='card-title text-black text-base'>Need Help to create Record?</h1>
            <Link href="/" className='flex items-center border-2 p-1'>
                <BookOpen className=""/>
                <p className='text-black ml-1'>Read Help Doc</p>
            </Link>
        </div>
    </div>
)
}

export default ExpenseRecord