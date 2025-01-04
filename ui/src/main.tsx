import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './reset-style.css'
import App from './App.tsx'
import { UploadImages } from './component/uploadImage/uploadImages.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
