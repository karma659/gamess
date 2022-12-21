import React, {useState, useEffect} from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import axios from "axios";

const Home = () => {


   const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {platform: 'browser'},
      headers: {
        'X-RapidAPI-Key': '2ba3220377msh67174ecf434335ep1f1c4cjsn596dbdcc1c6d',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
   const [spinner, setSpinner] = useState(true); 
   const [searchTerm, setSearchTerm] = useState("");
   const [movies, setMovies] = useState([]);
   const [db, setdb] = useState([]);

   useEffect(() => {
      const sM = async () => {
         setSpinner(true);
         // const response = await fetch(`http://localhost:5000/api`);
         // const data = await response.json();
         // setdb(data);
         // setMovies(data);
         // setSpinner(false);
         axios.request(options)
         .then(function (response) {
           console.log(response.data);
             setdb(response.data);
              setMovies(response.data);
                setSpinner(false)
         })
         .catch(function (error) {
             console.log(error);
         });
         console.log("fetching sucees");
       
      };
      sM();
   }, []);

   const searchMovies = async title => {
      setSpinner(true);
      const data = db.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setMovies(data);
      setSpinner(false);
      console.log("fetching success");
   };

 
   return (
      <div className="app">
         <h1> Live GameLand </h1>

         <div className="search">
            <input
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               placeholder="Search for movies"
            />
            <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
         </div>

         {movies?.length > 0 ? (
            <div className="container">
               {movies.map(movie => (
                  <span movie={movie} key={movie.id}>
                     
                     <MovieCard movie={movie} key={movie.id} />
                
                  </span>
               ))}
            </div>
         ) :spinner==true?(<h2>Loading...</h2>):(
            <div className="empty">
              <h2>No movies found</h2>
            </div>
         )}
      </div>
   );
};

export default Home;
