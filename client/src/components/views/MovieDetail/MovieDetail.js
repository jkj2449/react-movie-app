import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
    }, [])

    return (
        <div>

            <MainImage
                image={`${IMAGE_URL}/w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            <div style={{ width: '85%', margin: '1rem auto'}}></div>

                <MovieInfo
                    movie={Movie}
                />

            <br/>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                <button> Toggle Actor View </button>
            </div>
        </div>
    )
}

export default MovieDetail
