import { useState } from "react";
import './uploadImage.css';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Spinner } from '../spinner/spinner';
import ParsingResult from '../parsingResult/parsingResult';
import Error from '../error/error';

export function UploadImages() {
  const [images, setImages] = useState<{ file: File }[]>([]);
  const [mainButton, setmainButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(Boolean);
 
  const maxNumber = 1;

  const onChange = async (
    imageList: ImageListType,
    // addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
    setmainButton(true);
    const elem = document.querySelector('.uploader-image');
    await new Promise(resolve => setTimeout(resolve, 300));
    if (elem) elem.scrollTo(0, elem.scrollHeight);
  };

  const removeImage = () => { 
    setmainButton(false);
    setResponse(null);
  }
   
  
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!images[0]) {
      alert('Please select a file first!');
      return;
    }

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('image', images[0].file);

    setLoading(true);
 
    try {
      setError(false);
      // Send the form data to the server
      const path = '/api/upload/';
      const fetching = await fetch(path, {
        method: 'POST',
        body: formData,
        headers: {
          'check':'123456'
        }
      });
      const data = await fetching.json();
      const response = await fetching;
      if (response.ok) {
        setResponse(data);
      } else { 
         setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Error uploading the file:', error);
    } finally {
      setLoading(false);
      await new Promise(resolve => setTimeout(resolve, 300));
      const elem = document.querySelector('.uploader-image');
      const newElem = document.querySelector('.parsing-result');
      if (elem&&newElem) elem.scrollTo(0, (elem.scrollHeight-newElem.clientHeight));
    }
  };
  
  
  return (
    <div className="uploader-image">
      {loading && <Spinner />}
      {error && <Error textError='Server error, please try again later' />}
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps
        }) => (
          
          // write your building UI
          
          <div className='gen-wrapper'>
            <div className="upload__image-wrapper">
              {!mainButton ?
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button> : null}
              <button onClick={() => { onImageRemoveAll(); removeImage(); } }>{response ? 'Run again' : 'Delete image'}</button>
            </div>
            <div className='upload__image-wrapper'>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    {response ? <br></br> : <button onClick={handleSubmit}>Recognize</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      {response && <ParsingResult jsonData={response} />}
    </div>
  );
}
