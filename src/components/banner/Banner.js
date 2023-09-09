import { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios';
import requests from '../../Requests';

function Banner(){
    const [movie, setMovie] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }

        fetchData();
    }, []);

    console.log(movie)

    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
    <header 
        className='banner' 
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png")`,
            backgroundPosition: "center center"
    }}>
        <div className='banner_contents'>
            <h1 className='banner_title'>Movie</h1>
            <div className='banner_buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <h1 className='banner_description'>
                {
                    truncate(`Long descriptions are important for people with vision impairments. 
                    If someone can't see an image, or can't see the detail in it, 
                    they can't access the information it providesLong descriptions are 
                    important for people with vision impairments. If someone can't see an image, 
                    or can't see the detail in it, they can't access the information it provides.Long descriptions 
                    are important for people with vision impairments. If someone can't see an image, or 
                    can't see the detail in it, they can't access the information it provides.Long descriptions 
                    are important for people with vision impairments. If someone can't see an image, or can't see 
                    the detail in it, they can't access the information it provides.`, 150)

                }
           
            </h1>
        </div>
        <div className='banner_fadeBottom'></div>
    </header>
    )
    
}

export default Banner