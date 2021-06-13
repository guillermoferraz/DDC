import React,{useState, useEffect, useContext} from 'react'
import UserContext from '../context/User/UserContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {api} from '../global/links'
const Note = () => {
    
    const [ViewCard, setViewCard] = useState(false)
        
    const [note, setNote] = useState({
        notes:[],
        _id: '',
        title:'',
        comment:'',
        description:'',
        priority:'',
        date:''
    })
    const [modifyNote ,setModifyNote] = useState({
        _id: '',
        title:'',
        comment:'',
        description:'',
        priority:'',
    })

    
    const [userData, setUserData] = useState({})    
    const getData = async () => {
        const res = await axios.get('/data')
        const data = res.data.user
        
        
        setUserData({data})
        
        }
    




     const [newData ,setNewData] = useState(false)
     const [info, setInfo] = useState('')
     const [showEdit, setShowEdit] = useState(false)

    const noteSubimt = async () =>{
        const res = await axios.post('/notes', note)
    }
    
    const getNote = async () => {
        const res = await axios.get('/notes')
        const data = res.data
        setNote({notes: data})
    
    }
    const noteChange = (e) => {
        
        setNote({
            ...note,
            [e.target.name] : e.target.value    
        })
        
    }
    const deleteNote =  (id) => {
        const res = axios.delete(`${api}/notes/${id}`)
        getNote()
        
    }
    const editNote = async (id) => {
        const res = await axios.get(`${api}/notes/${id}`)
        const data = await res.data
        setModifyNote({
            _id:  res.data._id,
            title: data.title,
            description: data.description,
            comment: data.comment,
            priority: data.priority

        })
        setShowEdit(true)
        
    }

    const handleEdit =  async (e) => {
        setNewData({
            ...modifyNote, 
            _id: modifyNote._id,        
            [e.target.name]: e.target.value
            }) 
            
        }

    const updateNote = async (id) => {
        const res = await axios.put(`${api}/notes/` + newData._id, newData)
        setShowEdit(false)
    }

    const hideCardEdit = (e) => {
        setShowEdit(false)
    }

    useEffect(() => {
        getData()    
        getNote()
    
    }, [])


    const handleCard = (e) =>{
        setViewCard(true)
    }
    const handleCardNot = (e) =>{
        setViewCard(false)
    }




    return(
        <div className="">
            <button className="btn btn-primary btn-sm" onClick={(e) => handleCard(e)}>Create card</button>
            {ViewCard ? (
            <div className="row">
                <div className="card p-4 col-md-7 mx-auto">
                    <div>
                            <Link to="#" id="btn-cross" onClick={(e) => handleCardNot(e)} >X</Link>
                        </div>

                    <form onSubmit={noteSubimt}>
                        <div className="form-group">
                            <select name="priority" className="form-select m-2" onChange={noteChange}>
                                <option selected>select option</option>
                                <option>Low</option>
                                <option>Normal</option>
                                <option>Hight</option>
                            </select>
                            <input type="text" className="form-control m-2" name="title" placeholder="Title" onChange={noteChange}/>
                            <input type="text" className="form-control m-2" name="comment" placeholder="Comment" onChange={noteChange}/>
                            <textarea type="text" className="form-control m-2" name="description" placeholder="Description" rows="8" onChange={noteChange}></textarea>
                            <button className="btn btn-primary m-2">Send</button>
                        </div>
                    </form>
                </div>
            </div>

            ) : (<></>)}                    
            <div className="">
                    
                    {userData !== false ? (
                        <div className="row mx-auto m-0 p-0">
                {  
                  note.notes.map(n => {
                        return(
                            <div key={n._id} className="card col-md-3 m-3 p-0 mx-auto shadow shadow-lg-4">
                                                                    
                                {n.priority === "Low" ?  (<div className="priority-low"><p>{n.priority}</p></div>) : n.priority === "Hight" ? (<div className="priority-hight"><p>{n.priority}</p></div>) : n.priority === "Normal" ? (<div className="priority-normal"><p>{n.priority}</p></div>) : (<div className="card-header bg-dark text-ligth"><p>{newData.priority}</p></div>) }

                                    <div className="card-body m-0">
                                    <h5>{n.title ? (`${n.title}`) : (`${newData.title}`)}</h5>
                                    <hr/>
                                    <h6>{n.comment ? (`${n.comment}`): (`${newData.comment}`)}</h6>
                                    <hr/>
                                    <div className="card-body description-note">
                                        <p>{n.description ? (`${n.description}`) : (`${newData.description}`)}</p>
                                    </div>
                                    <hr/>
                                </div>
                                    <div className="d-flex p-2">
                                        <div>
                                            <Link to="#" className="btn btn-info btn-sm float-start" onClick={() => editNote(n._id)}><i className="fas fa-edit"></i></Link>
                                        </div>
                                        <div> 
                                            <Link className='btn btn-sm btn-primary' to="#" onClick={() => deleteNote(n._id)} ><i className="fas fa-trash"></i></Link> 
                                        </div>
                                    </div>
                                        <small className="p-2 text-end">{n.date.slice(8,10)}-{n.date.slice(5,7)}-{n.date.slice(0,4)}</small>
                                    
                            </div>
                        )
                    }) 
                } 
                </div>

                    ) : (<div className="card col-md-8 mx-auto shadow shadow-lg-4 p-4 mt-5 text-center">
                            <h5>Please logout and re autenticate your profile</h5>
                        </div>)}
                                    
                    { showEdit ? (
                    <div className="col-md-8 mx-auto"> 
                        <div className="card p-0 shadow shadow-lg-4 mb-4">
                             <div className="card-body">
                                <form onSubmit={updateNote}>
                                    <select name="priority" className="form-select" onChange={handleEdit}>
                                        <option selected>{modifyNote.priority}</option>
                                        <option>Low</option>
                                        <option>Normal</option>
                                        <option>Hight</option>
                                    </select>
                                    <div className="p-2 mt-2">
                                        <div className='card-body'>
                                        { newData == false ?(
                                            <div>
                                                <input type="text" name="title" onChange={handleEdit} value={modifyNote.title} className="form-control mt-2"/>
                                                <input type='text' name="comment" value={modifyNote.comment} onChange={handleEdit} className='form-control mt-2'/>
                                                <textarea onChange={handleEdit} name='description' type="text" rows="8" className="form-control mt-2" value={modifyNote.description}></textarea>
                                            </div>


                                        ) :(
                                            <div>
                                                <input type="text" name="title" onChange={handleEdit}  className="form-control mt-2"/>
                                                <input type='text' name="comment" onChange={handleEdit}  className="form-control mt-2"/>
                                                <textarea onChange={handleEdit} name='description' type="text" rows="8" className="form-control mt-2" ></textarea>
                                            </div>

                                            )
                                        }
                                        </div>
                                    </div>
                                        <div className="d-flex mx-auto">
                                            <div className="float-start m-2">
                                                <button type="submit" className="btn btn-success">Done</button>
                                            </div>
                                            <div className="float-start m-2">
                                                <button className="btn btn-primary" onClick={(e) => hideCardEdit(e)}>Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                        </div>  

                    ) : (<></>)}

                    </div>
                </div>
    )
}
export default Note;
