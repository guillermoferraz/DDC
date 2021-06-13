import React,{useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {api, app} from '../global/links';
import usr_logo from './logo_usr/usr.png'
import UserContext from '../context/User/UserContext'
const Nav = () => {


    const {user, getUser, getAvatar, avatar} = useContext(UserContext)

    useEffect(() => {
    
        getUser();
        getAvatar()
        
    }, [])
    
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow shadow-lg-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">DDC</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/table">Tables</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Works</Link>
                        </li>
                    </ul>
                </div>
            </div>
                <div className="row">
            
                        <div className="float-right col-md-3">
                            <Link  to="/profile">
                                {avatar ? (
                                     <img className="img rounded-circle" width="40" height="40" src={avatar.path} />

                                ) :  (
                                 <img className="img rounded-circle" width="40" height="40" src={usr_logo} />

                                )}
                            </Link>                       
                            <div className="mt-1 text-nav">
                                <small>{user.user}</small>
                            </div>
                        </div>
                        

                    <div className="logout col-md-7">
                        <a className="nav-link text-light" href={`${api}/logout`} tabindex="-1" aria-disabled="true"><i className='fas fa-sign-out-alt'></i></a>
                    </div>
                </div>
        </nav>
    </div>

    )
}

export default Nav;
