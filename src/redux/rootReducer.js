import { combineReducers } from "redux"

const defaultState = {
    users: [],
    currentUser: null,
    loading: false
}

const usersReducer = (
    state = defaultState.users,
    action
) => {
    switch (action.type){
        case 'ADD_USERS':
            return action.users
        case 'ADD_NEW_USER':
            return [...state, action.newUser]
        default :
            return state
    }
}

const currentUserReducer = (
    state = defaultState.currentUser,
    action
) => {
    switch (action.type){
        case 'SET_CURRENT_USER':
            return action.currentUser
        default:
            return state
    }
}

const loadingReducer = (
    state = defaultState.loading, action
    ) => {
    switch(action.type){
        case 'FETCH_USERS':
            return {
                loading: true
            }
        case 'ADD_USERS':
            return {
                loading: false
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    users: usersReducer,
    loading: loadingReducer,
    currentUser: currentUserReducer
})

export default rootReducer