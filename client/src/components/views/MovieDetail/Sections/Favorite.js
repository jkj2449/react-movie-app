import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    const movieId = props.movieId
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime
    const userFrom = props.userFrom

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let body = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime : movieRuntime
    }

    useEffect(() => {
        
        Axios.post('/api/favorite/favoriteNumber', body)
            .then(response => {
                if(!response.data.success) {
                    alert('서버 통신 오류')
                    return
                }

                setFavoriteNumber(response.data.favoriteNumber)
            })

        
        Axios.post('/api/favorite/favorited', body)
            .then(response => {
                if(!response.data.success) {
                    alert('서버 통신 오류')
                    return
                }

                setFavorited(response.data.favorited)
            })
    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', body)
                .then(response => {
                    if(!response.data.success) {
                        alert('Favorite 삭제 실패')
                        return
                    }

                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', body)
                .then(response => {
                    if(!response.data.success) {
                        alert('Favorite 추가 실패')
                        return
                    }

                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited? "Not Favorite " : "Add to Favorite "} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
