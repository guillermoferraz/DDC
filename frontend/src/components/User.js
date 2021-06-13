import React,{useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom'
import UserContext from '../context/User/UserContext';
import axios from 'axios';

import Nav from '../components/Navbar'
import Note from '../components/Note'

const User =() => {
    const {user, getUser, getAvatar, getNote, getList} = useContext(UserContext)
    
    const getData = async () => {
        const res = await axios.get('/data')
    
    }


    useEffect(() => {
        getData()
        getUser();
    }, [])
    
   
    const [ViewCard, setViewCard] = useState(false)
    
   const handleCard = (e) =>{
        setViewCard(true)
       console.log(ViewCard)
    }
    const handleCardNot = (e) =>{
        setViewCard(false)
       console.log(ViewCard)
    }


    return (

        <div className="mx-auto">
            <Nav/>            
            <Note/>
        </div>
    )
}


export default User;

