import { useEffect, useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import CurrencyDropdown from "./dropdown";


const CurrencyConvertor = () => {
  const [currencies ,setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1)

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites") )|| ["INR" ,"EUR"])
   // currencies -> https://api.frankfurter.app/currencies
   const fetchCurrencies = async()=>{
     try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
     } catch (error) {
      console.error("Error are Fetching" ,error);
     }
   }
   useEffect(()=>{
    fetchCurrencies();

   },[]);
  //  console.log(currencies);

   // currencies -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
   const currencyConvertor = async ()=>{
    // Conversion logic
    if(!amount) return
    setConverting(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      
      setConvertedAmount(data.rates[toCurrency]+" " + toCurrency)
     } catch (error) {
      console.error("Error are Fetching" ,error);
     }finally{setConverting(false)}
   };
   const  handleFavorite = (currency)=>{
// add Favorite
let updatedFavorites = [...favorites];
  if(favorites.includes(currency)){
    updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
  }else{
    updatedFavorites.push(currency);
  }
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites",JSON.stringify(updatedFavorites));

   }
  
   const swapCurrencies = ()=>{

     setFromCurrency(toCurrency);
     setToCurrency(fromCurrency);
   }
   

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
      CurrencyConvertor
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 items-end">
          <CurrencyDropdown currencies={currencies}
          favorites={favorites} 
          title="from"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
           handleFavorite={handleFavorite}/>
          {/* Swap Currency DropDwon */}
          <div className="flex justify-center mb-2 sm:md-0">
            <button onClick={swapCurrencies} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <HiOutlineSwitchHorizontal className="text-xl text-gray-700 " />
            </button>
          </div>
          <CurrencyDropdown
           currencies={currencies} 
           favorites={favorites} 
           title="to"
           currency={toCurrency}
           setCurrency={setToCurrency}
            handleFavorite={handleFavorite}/>
        </div>
        <div className="bold text-sm font-medium text-gray-700">
          <label htmlFor="amount" className="text-2xl">Amount:</label>
          <input type="number" 
          value={amount}
           onChange={(e)=>{
            setAmount(e.target.value);
          }}
           className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
        <div className="flex justify-end mt-6 ">
          <button onClick={currencyConvertor} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse":""}`}>Convert</button>
        </div>
         { convertedAmount && (<div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount:{convertedAmount}
        </div>
        ) }
        </div>
  )
}

export default CurrencyConvertor;