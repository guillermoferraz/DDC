import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {api} from '../global/links'


const Login = () => {

    return(
        <div className="mt-5">
            <div className="col-md-4 mx-auto">
                <div className="card shadow shadow-3">
                    <div className="card-header">
                        <div className="card-title">
                            <h4>SignIn</h4>
                        </div>
                     </div>
                     <div className="card-body">
                        <form className="form-group p-3" action={`${api}/login`} method="POST">
                            <input type="email" name="email" className="form-control  m-2" placeholder="Email"/>
                            <input type="password" name="password" className="form-control m-2" placeholder="Password"/>
                            <button type="submit" className="btn btn-primary m-2">Send</button>
                        </form>
                    </div>
                        <div className="form-inline d-flex">
                            <div className="float-start">
                                <p className="nav-link">Create account</p>
                            </div>
                            <div className="float-end">
                                 <Link className="nav-link mb-2 text-decoration-none text-center text-warning" to="/register">SignUp</Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>

    )
}
export default Login;
