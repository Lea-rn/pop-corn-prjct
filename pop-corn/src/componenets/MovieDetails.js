import { useState , useEffect } from "react";
import StartRating from "../StartRating";
import Loader from "./Loader";

export default function MovieDetails({ selectedId, onCloseMovie , onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading , setIsLoading] = useState(false)
  const [userRating , setUserRating] = useState("")
  const Key = "d997c473";

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot : plot
  } = movie;

 function handleADD (){
    const newWatchedMovie = {
        poster  , 
        title , 
        year , 
        runtime , 
        imdbRating , 
        userRating

    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
 }

  useEffect(function () {
    async function getMovieDetails() {
        setIsLoading(true)
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails();
  }, [selectedId]);

  return (

   <>
    {isLoading ? <Loader/> : 

           <div className="details">

      <span className="btn-back" onClick={onCloseMovie}>
        ⬅️
      </span>
      <div className="details-overview">
<header>
       <img src={poster} alt={`Poster of ${title}`}/>
     
  <div className="header-movie-info">
        <h2 style={{marginBottom:"10px"}}>{title}</h2> 
      <p style={{marginBottom:"10px"}}>
        {released} . {runtime}
      </p>
      <p style={{marginBottom:"10px"}}>{genre}</p>
      <p style={{marginBottom:"10px"}}>
        <span>⭐</span>
        {imdbRating} IMDB rating
      </p>
  </div>
</header>
      <section className="footer-movie-info">
     
     <div className="rating">
   <StartRating size={24} onSetNewComponentRating={setUserRating} />
   <button onClick={()=>handleADD()}>+ Add to list</button>
     </div>

        <p style={{marginBottom:"10px"}}>
          <strong>
            {plot}
          </strong>
        </p>
        <p style={{marginBottom:"10px"}}> <strong style={{fontSize:"20px"}}>Starring :</strong> {actors}</p>
        <p style={{marginBottom:"10px"}}> <strong style={{fontSize:"20px"}}>Directed by : </strong> {director}</p>
      </section>
     </div>
    </div>
     }
 
   
   </>
  );
}