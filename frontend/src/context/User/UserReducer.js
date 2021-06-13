import {GET_USER, GET_NOTE,GET_BLOG,GET_AVATAR, CREATE_USER} from '../types';

export default (state, action) => {
    const {payload, type} = action;

    switch(type){
        case GET_USER:
            return{
                ...state,
                user: payload
            }
        case CREATE_USER:
            return{
                ...state,
                createUser: state
            }
        case GET_AVATAR:
            return{
                ...state,
                avatar: payload
            }
        case GET_BLOG:
            return{
                ...state,
                blog: payload
            }
        case GET_NOTE:
            return{
                ...state,
                note: state
            }
        default:
            return state
    }
}
