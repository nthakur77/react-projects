import { useCallback, useState, useRef, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("")
  const [checkNumber, setCheckNumber] = useState(false)
  const [checkSymbole, setCheckSymbol] = useState(false)

  let passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(checkNumber) str += "0123456789"
    if(checkSymbole) str += "!@#%^&*(){}[]?><"

    for(let i = 1; i <= length; i++){
      let ind = Math.floor(Math.random() * str.length);
      pass += str[ind];
    }

    setPassword(pass);
  }, [checkNumber, checkSymbole, setPassword, length])

  let copyPassword = useCallback(()=>{
    passwordRef.current?.select(); // user response is good here 
    navigator.clipboard.writeText(password)
  })

  let passwordRef = useRef(null) // use to ref any dom element in the dom tree 
  // querySelector -> search in the dom tree, it is more useful bcz it holds the ref of dom 

  // use to change the component while rerendering  
  useEffect(() => {
    passGenerator()
  }, [checkNumber, checkSymbole, length])

  return (
    <>
      <div className="password">
        <h1>Password generator</h1>
        <div><input type='text' placeholder='password' id='write' value={password} ref={passwordRef}></input>
        <button onClick={copyPassword}>copy</button></div>
        <div class="allBoxes">
          <input
            type='range'
            id='range'
            min={10}
            max={20}
            value={length}
            onChange={(e) =>  setLength(e.target.value)}/>
          <label htmlFor="range">{length} length</label>
          
          <input
            type="checkbox"
            id='checkNumber'
            checked={checkNumber}
            onChange={(e) => setCheckNumber(e.target.checked)}
          />

          <label>Include Numbers</label>

          <input
            type="checkbox"
            id='checkSymbol'
            checked={checkSymbole}
            onChange={(e) => setCheckSymbol(e.target.checked)}
          />

          <label htmlFor='checkSymbol'>Include Symbol</label>
        </div>
      </div>
    </>
  )
}

export default App
