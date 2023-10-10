import { useEffect, useState } from 'react'
import './Row.css'
import axios from "../../axios"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useRef } from 'react';

export default function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";


    const rowRef = useRef(null)

    const handleLeftArrow = () => {
        rowRef.current.scrollLeft -= 400;
    };
  
    const handleRighttArrow = () => {
              rowRef.current.scrollLeft += 400;
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='rowMovies--left' onClick={handleLeftArrow}>
                <MdOutlineNavigateBefore/>
            </div>
            <div className='rowMovies--right' onClick={handleRighttArrow}>
                <MdOutlineNavigateNext/>
            </div>

            <div className='row_posters' ref={rowRef}>

                {movies.map((movie) =>
                    ((isLargeRow && movie.backdrop_path) || (!isLargeRow && movie.backdrop_path)) &&
                    (
                        <img
                            key={movie?.id}
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                }`}
                            alt={movie.name}
                        />

                    )
                )}
            </div>

            

        </div>
    )
}
