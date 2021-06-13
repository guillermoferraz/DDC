import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Nav from './Navbar'
import UserContext from '../context/User/UserContext'
import {api} from '../global/links'
import usr_logo from './logo_usr/usr.png'


const Profile = () => {


    const {user, avatar} = useContext(UserContext)
    
    

    

    return(
        <div>
            <Nav/>
            <div>
                <div className="card card-body col-md-6 mt-5 shadow shadow-4 p-4 mx-auto" >
                    <div className="d-flex">
                        <label>Name: &nbsp;</label>
                        <h5 className="mt-1">{user.user}</h5>
                    </div>
                    <div className="d-flex">
                        <label className="mt-1">Email: &nbsp;</label>
                        <p className="mt-1 ">{user.email}</p>
                    </div>
                    {avatar ? (
                        <div className="mx-auto p-4">
                            <img className="img rounded-circle" width='150' height='150' src={avatar.path}/>
                        </div>
                    ) : (
                        <div className="mx-auto p-4">
                            <img className="img rounded-circle" width='150' height='150' src={usr_logo}/>
                        </div>

                    )}
                </div>
                <form enctype="multipart/form-data" method="POST" action={`${api}/avatar`} className="col-md-6 mt-5 mx-auto">
                    <div className="card card-body">
                        <div>
                            <input type="hidden" value={user.user} name="username"/>
                            <input type='file' className="form-control" name="img"/>
                        </div>
                    </div>
                    <button type='submit' className="btn btn-success m-2">Done</button>
                </form>
            </div>
        </div>
    )
}
export default Profile;
