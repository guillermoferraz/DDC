import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api } from '../global/links'
import  Nav from './Navbar'
import UserContext from '../context/User/UserContext'


const Blog = () => {
    
    const {getBlog, blog} = useContext(UserContext)
    
        
    const [newBlog, setNewBlog] = useState({
        title:'',
        content:''
    })
    const [modifyBlog, setModifyBlog] = useState(false)
    const [showCardBlog, setShowCardBlog] = useState(false)
    const [showCardEditBlog, setShowCardEditBlog] = useState(false)


    const handleChange = (e) => {
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value
        })
        console.log('new Blog:', newBlog)
    }
    

    const submitBlog = async () =>{
        const submit = await axios.post('/blog', newBlog)
    }
    const submitBlogEdit = async () =>{
        const submit = await axios.put('/blog/' + modifyBlog._id, modifyBlog)
    }
    const handleChangeEdit = (e) => {
        setModifyBlog({
            ...modifyBlog,
            [e.target.name]: e.target.value
        })
        console.log('new Blog:', modifyBlog)
    }

    
    const showCreateBlog = (e) => {
        setShowCardBlog(true)
    }
    const hideCreateBlog = (e) => {
        setShowCardBlog(false)
    }
     const showEditBlog = (e) => {
        setShowCardEditBlog(true)
    }
    const hideEditBlog = (e) => {
        setShowCardEditBlog(false)
    }

    
    useEffect(() => {
        getBlog()
    },[])
        console.log('blog:',blog)
    
        const deleteBlog = (id) => {
        const del = axios.delete(`${api}/blog/${id}` )
        getBlog()
       }

        const editBlog = async (id) => {
            const res = await axios.get(`/blog/${id}`)
            const data = res.data
            setModifyBlog(data)
            setShowCardEditBlog(true)
            console.log('edit data:', data)
        }

    

    return (
        <div>
            <Nav/>
            <div>
                <button 
                className="btn btn-sm btn-info"
                onClick={(e) => showCreateBlog(e)}
                >
                New Blog
                </button>
            </div>
            {showCardBlog ? (
            <div>
                <div className="card card-body m-4 shadow shadow-lg-4">
                    <div>
                        <Link to="#" id="btn-cross" 
                        onClick={(e) => hideCreateBlog(e)}
                        >
                        X
                        </Link>
                    </div>

                    <form onSubmit={submitBlog}>
                        <input type="text" 
                        name="title" 
                        placeholder="Title" 
                        className='form-control m-1' 
                        onChange={(e) => handleChange(e)}
                        />
                        <textarea 
                        type="text" 
                        name="content" 
                        placeholder="Content" 
                        className="form-control m-1" 
                        rows="10"
                        onChange={(e) => handleChange(e)}
                        >
                        </textarea>
                        
                        <button 
                        className='btn btn-info m-1'
                        >
                        Publicate
                        </button>
                    </form>
                </div>
            </div>

            ) : (<></>)}


            {blog ? (
                <div>
                    {
                        blog.map(b => {
                            return(
                                <div key={b._id}>
                                     {showCardEditBlog ? (
                                         <div key={modifyBlog._id}>
                                             <div className="card card-body m-4 shadow shadow-lg-4">
                                                    <form onSubmit={submitBlogEdit}>
                                                        <input type="text" 
                                                        name="title" 
                                                        placeholder="Title" 
                                                        className='form-control m-1'
                                                        value={modifyBlog.title}
                                                        onChange={(e) => handleChangeEdit(e)}
                                                        />
                                                        <textarea 
                                                        type="text" 
                                                        name="content" 
                                                        placeholder="Content" 
                                                        className="form-control m-1" 
                                                        rows="10"
                                                        onChange={(e) => handleChangeEdit(e)}
                                                        value={modifyBlog.content}
                                                        >
                                                        </textarea>
                        
                                                        <button 
                                                        className='btn btn-info m-1'
                                                        >
                                                        Publicate
                                                        </button>
                                                        <button 
                                                        onClick={(e) => hideEditBlog(e)}
                                                        className='btn btn-primary m-1'
                                                        >
                                                        Cancel
                                                        </button>

                                                    </form>
                                                </div>
                                            </div>

                                ) : (<></>)}



                                    <div className="m-4 shadow shadow-lg-4" >
                                        <div className="card card-body blog">
                                            <div className='row'>
                                                <div className="text-end">
                                                    <Link to="#"
                                                    onClick={() => editBlog(b._id)}
                                                    >
                                                    <i className="fas fa-edit m-2"></i>
                                                    </Link>
                                                    <Link to="#"
                                                    onClick={() => deleteBlog(b._id)}
                                                    >
                                                    <i className="fas fa-trash m-2"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <h5>{b.title}</h5>
                                            <hr/>
                                            <p>{b.content}</p>
                                            <hr/>
                                            <small className="p-2 text-end">{b.date.slice(8,10)}-{b.date.slice(5,7)}-{b.date.slice(0,4)}</small>

                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            )  :  (
                <div>
                    <h1>No data</h1>
                </div>
            )}
        </div>
    )
}
export default Blog;
