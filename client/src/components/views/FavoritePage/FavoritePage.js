import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover, Button } from 'antd'
import { IMAGE_URL } from '../../Config';

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fectchFavoredMovie()
    }, [])

    const fectchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', {
            userFrom: localStorage.getItem('userId')
        })
        .then(response => {
            if(!response.data.success) {
                alert('영화 정보를 가져오는 실패')
                return
            }

            setFavorites(response.data.favorites)
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const body = {
            movieId: movieId,
            userFrom: userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', body)
            .then(response => {
                if(!response.data.success) {
                    alert('Favorite 삭제 실패')
                    return
                }

                fectchFavoredMovie()
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_URL}/w500${favorite.moviePost}`}/> : "no image"}
            </div>
        )
        
        return (
            <tr key={index}>

                <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
                </Popover>

                <td>{favorite.movieRuntime} min</td>
                <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
            </tr>
        )
})
    
    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove form favorties</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
