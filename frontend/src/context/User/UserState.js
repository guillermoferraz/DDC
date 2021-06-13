import React, {useReducer, userState} from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios';
import {api} from '../../global/links'
const UserState = (props) => {
    const initialState = {

        user: [],
        avatar:[],
        blog:[]
        
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUser = async() => {
        const res = await axios.get('/data')
        dispatch({
            type: 'GET_USER',
            payload: res.data
        })
    
    }
    const getNote = async() => {
        const res = await axios.get('/note')
        dispatch({
            type: 'GET_NOTE',
            payload: res.data
        })
        
    }
    const getBlog = async() => {
        const res = await axios.get('/blog')
        dispatch({
            type: 'GET_BLOG',
            payload: res.data
        })
         
    }

     const getAvatar = async() => {
        const res = await axios.get('/avatar')
        dispatch({
            type: 'GET_AVATAR',
            payload: res.data[0]
        })
              
    }

    
    return(
        <UserContext.Provider value={{
            user: state.user,
            avatar: state.avatar,
            blog:state.blog,
            getUser,
            getAvatar,
            getBlog
            
            

        }}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;
