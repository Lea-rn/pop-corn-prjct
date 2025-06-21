import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StartRating from './StartRating';
import BehindtheSc from './BehindtheSc';

function Test () {
  const [movieRating , setMovieRating] = useState(0)
  return  <div>
<StartRating color='blue'  onSetNewComponentRating={setMovieRating} />
<h1 style={{fontSize:"20px"}} >This movie was rated {movieRating} stars </h1>
  </div> 
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StartRating maxRating={5} messages= {
      ["Terrible" , "Bad" , "Okay" , "Good" , "Amazing"]
    }  />    */}
{/* 
    <StartRating  maxRating={2} color='green' />
    <StartRating/>
 
 
<Test/> */}
 
   

    {/* <App /> */}

    <BehindtheSc/>
  </React.StrictMode>
);


