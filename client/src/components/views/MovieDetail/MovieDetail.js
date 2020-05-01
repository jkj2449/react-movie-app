import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from "../commons/GridCard"
import Favorite from './Sections/Favorite'
import { Row } from "antd"
import { Button } from 'antd'

function MovieDetail(props) {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        
        const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>

            <MainImage
                image={`${IMAGE_URL}/w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            <div style={{ width: '85%', margin: '1rem auto'}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom={localStorage.getItem('userId')}
                    />
                </div>

                <MovieInfo
                    movie={Movie}
                />

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <Button onClick={toggleActorView}> Toggle Actor View </Button>
                </div>

                {ActorToggle &&

                <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => (
                        
                        <React.Fragment key={index}>
                            {cast.profile_path &&

                            <GridCards
                                image={ cast.profile_path ? `${IMAGE_URL}/w500${cast.profile_path}` : null }
                                characterName={ cast.name }
                            />

                            }
                        </React.Fragment>
                    ))}
                    
                </Row>

                }

            </div>
        </div>
    )
}

export default MovieDetail
