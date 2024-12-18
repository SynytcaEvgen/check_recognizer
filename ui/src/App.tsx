import { useState } from 'react'
import './App.css'
import { UploadImages } from './UploadImages'
import { Header } from './header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <UploadImages/>
      <div>
        <p>React</p>
      </div>
    </>
  )
}

export default App
