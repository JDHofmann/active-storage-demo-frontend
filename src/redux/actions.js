export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({type: 'FETCH_USERS'})
        fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        // .then(console.log)
        .then(data => dispatch({
            type: 'ADD_USERS',
            users: data
        }))
    }
}

// do I need this?

export const addUsers = () => {
    return {
        type: 'ADD_USERS'
    }
}