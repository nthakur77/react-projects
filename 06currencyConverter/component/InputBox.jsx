import React, {Component, useState} from 'react'
import './InputBox.css'

function InputBox({
    
}){
    return (
        <>
        <div class="currency-box">
            <div class="amount-section">
                <label for="amountInput" class="label">
                    Amount
                </label>

                <input
                    id="amountInput"
                    class="amount-input"
                    type="number"
                    placeholder="Amount"
                />
            </div>

            <div class="currency-section">
                <p class="currency-label">Currency Type</p>

                <select class="currency-select">
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                </select>
            </div>
        </div>
        </>
    )
}

export default InputBox;