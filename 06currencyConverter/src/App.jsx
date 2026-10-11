import { useState } from 'react'
import useCurrencyInfo from './hook/useCurrencyInfo'
import './App.css'
import InputBox from '../component/InputBox'

function App() {
  
  return (
    <>
      <div id='background'>
        <div id='inputs'>
            <form>
              <InputBox/>
              <button> swap </button>
              <InputBox/>
            </form>
            <button>calculate</button>
        </div>
      </div>
    </>
  )
}

export default App
