import { useState } from 'react' // use state is a hook 
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  let [count, setCount] = useState(15);

  return (
    <>
    <h1>chai or code</h1>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>increase</button>
    <button onClick={() => setCount(count - 1)}>decrease</button>
    </>
  )
}

export default App
