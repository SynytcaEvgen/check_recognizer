import { useState } from 'react';
import './App.css';
import { UploadImages } from './component/uploadImage/UploadImages';
import { Header } from './component/header/header';

function App() {

  return (
    <div className='app'>
      <Header />
      <UploadImages/>
      <div className='auth_name'>
        <p>Yevhen Synytsia</p>
      </div>
    </div>
  )
}

export default App
