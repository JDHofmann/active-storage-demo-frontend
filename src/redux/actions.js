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
export const fetchCurrentUser = (id) => {
    return (dispatch) => {
        console.log(id)
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(data => dispatch({
            type: 'SET_CURRENT_USER',
            currentUser: data
        }))
    }
}

export const addNewUser = (newUserFormData) => {
    return (dispatch) => {
        let options = {
            method: "POST",
            body: newUserFormData
        }
        fetch("http://localhost:3000/users", options)
        .then(resp => resp.json())
        .then(data => dispatch({
            type: 'ADD_NEW_USER',
            newUser: data
        }))
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(removedUser => dispatch({
            type: 'REMOVE_USER',
            removedUser
        }))
    }
}

export const editUser = (updatedUser) => {
    console.log("editting", updatedUser)
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${updatedUser.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(resp => resp.json())
        .then(user => dispatch({
            type: 'UPDATE_USER',
            user
        }))
    }
}

export const addUsers = () => {
    return {
        type: 'ADD_USERS'
    }
}