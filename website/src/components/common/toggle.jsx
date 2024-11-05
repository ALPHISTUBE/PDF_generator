'use client'
import React from 'react'

const Toggle = () => {
  return (
    <input 
      type="checkbox" 
      className="toggle border-white bg-white hover:bg-white [--tglbg:#e1e1e1]" 
      defaultChecked 
      onChange={(e) => {
        e.target.style.setProperty('--tglbg', e.target.checked ? '#7F56D9' : '#e1e1e1');
      }}
    />
  )
}

export default Toggle