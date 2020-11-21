import React from 'react'

export const UserCard = (props) => {

    const handleClick = () => {
        // console.log(props.user.id)
        props.fetchCurrentUser(props.user.id)
    }

    return(
        <div onClick={handleClick}>
            <h2>{props.user.name}</h2>
        </div>
    )
}