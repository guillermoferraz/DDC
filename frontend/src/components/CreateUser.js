import React,{useEffect, useContext,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {

    const [form,setForm] = useState({
        user: '',
        email: '',
        password: '',
        confirm_password: ''
    })
        console.log('user:', form.user)
        console.log('email:', form.email)
        console.log('pass:', form.password)
        console.log('c_pass:', form.confirm_password)

        console.log('form:',form)

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/register', form)
        window.location = '/';
    }  

    
    return (

        <div className="mt-5">
            <div className="col-md-4 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <h4>Create Account</h4>
                        </div>
                     </div>
                     <div className="card-body">
                        <form className="form-group p-3" onSubmit={handleSubmit}>
                            <input type="text" name="user"  className="form-control m-2" placeholder="Name"  onChange={handleChange} value={form.user}/>
                            <input type="email" name="email" className="form-control  m-2" placeholder="Email" onChange={handleChange} value={form.email}/>
                            <input type="password" name="password" className="form-control m-2" placeholder="Password"  onChange={handleChange} value={form.password}/>
                            <input type="password" name="confirm_password" className="form-control m-2" placeholder="Confirm Password"  onChange={handleChange} value={form.confirm_password}/>
                            <button type="submit" className="btn btn-primary m-2">Send</button>
                        </form>
                    </div>
                        <div className="d-flex">
                            <div>
                                <p className="float-start nav-link">You have account!</p>
                            </div>
                            <div className='float-end'>
                                <Link className="mb-2 text-decoration-none nav-link text-warning" to="/">SignIn</Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default CreateUser;

