import React from "react";
import './header.css'
import ImageUploading, { ImageListType } from "react-images-uploading";

export function Header() {
  return (
    <header className='header'>
      <h2>Check Recognizer</h2>
      <p className='small-text'>powered by Google Gemini2.0</p>
    </header>
  );
}
