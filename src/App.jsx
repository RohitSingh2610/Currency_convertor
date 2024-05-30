import React from 'react'

import './App.css'
import CurrencyConvertor from './components/currency-convertor'
function App() {
  

  return (
     <div className=' min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <div className="container">

      <CurrencyConvertor/>
      </div>
      {/* <h1 className='text-green-500 text-5xl bg-gray-600 rounded-lg pt-3 bottom-4 px-3 py-4'>Currency Convertor</h1> */}
    </div>
  )
}
//
export default App
