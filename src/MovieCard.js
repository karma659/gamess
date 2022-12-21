import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";




const MovieCard = ({movie: {id, title,thumbnail, game_url, genre ,release_date , publisher,platform}}) => {


   const openInNewTab = (url,id) => {
       
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null;
     
    }


   return (
      <div className="movie" key={id}>
         <div>
            <p  >{publisher}</p>
             <p> {platform}</p> 
         </div>
         
         <div>
        
               <img
                  src={thumbnail !== "N/A" ? thumbnail : "https://via.placeholder.com/400"}
                  alt={title}
                     onClick={() => openInNewTab(game_url,id)} 
                    
               />
               
         </div>
             
         <div>
            <span>{genre}</span>
            <h3>{title}</h3>
            <h4>{release_date}</h4>
         </div>
         
      </div>
   );
};

export default MovieCard;
