import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('levender')
  document.body.style.backgroundColor = color;

  return (
    <>
    <div id='bg-changer'>
      <button class="color" onClick={()=>setColor('blue')} style={{backgroundColor : color}}>
        blue
      </button>
      <button class="color" onClick={()=>setColor('red')} style={{backgroundColor : color}}>
        red
      </button>
      <button class="color" onClick={()=>setColor('green')} style={{backgroundColor : color}}>
        green
      </button>
      <button class="color" onClick={()=>setColor('yellow')} style={{backgroundColor : color, color : "black"}}>
        yellow
      </button>
    </div>
    </>
  )
}

export default App
