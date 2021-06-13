import React ,{useState, useEffect}from 'react';
import {Link} from 'react-router-dom';
import {api} from '../global/links'
import Nav from './Navbar';
import axios from 'axios';


const Table = () =>{
      



    const [show, setShow] = useState(false)
    const [table ,setTable ] = useState({
        rows: [],
        _id:'',
        name:'',
        title:'',
        comment: '',
        description:''
    })

    const [modifyTable, setModifyTable] = useState({
        _id:'',
        name:'',
        title:'',
        comment:'',
        description:''
    })
    

    const getTable = async() => {
        const res = await axios.get('/tables')
        const data = res.data
        setTable({rows: data})
        
    }
    const editTable = async(id) =>{
        const res = await axios.get(`${api}/tables/${id}`) 
        const data = res.data
        setModifyTable({
            _id: data._id,
            name: data.name,
            title: data.title,
            comment: data.comment,
            description: data.description
        })
    }
        const handleEdit = (e) =>{
            setModifyTable({
                ...modifyTable,
                _id: modifyTable._id,
                [e.target.name]: e.target.value
            })
        }
   
        const submitTable = async () => {
        const send = await axios.post('/tables', table)
    }
    const editSubmit = () => {
        const edit = axios.put(`${api}/tables/` + modifyTable._id, modifyTable)
        getTable()
    }
    const deleteRow = (id) => {
        const del = axios.delete(`${api}/tables/${id}`)
        getTable()
    }
    
    const handleTable = (e) =>{
        setTable({
            ...table,
            [e.target.name]:e.target.value
        })
        
    }


    const handleShow = (e) =>{
        setShow(true)
    }

    const handleHide = (e) => {
        setShow(false)
    }
    

    useEffect(() => {
        getTable();
    }, [])





    return(
        <div>
            <Nav/>
            <button className="btn btn-primary btn-sm" onClick={(e) => handleShow(e)}>Add data</button>

            <div className="col-md-6 mx-auto">
                <div className="row">
                {show ? (
                 <div className='card shadow shadow-3'>
                        <div>
                            <Link to="#" id="btn-cross" onClick={(e) => handleHide(e) }>X</Link>
                        </div>  
                        
                        <form className="form-group p-3" onSubmit={submitTable}>
                            <input type="text" name="name" className="form-control mt-2" placeholder="Name"  onChange={handleTable}/>
                            <input type="text" name="title" className="form-control mt-2" placeholder="Title" onChange={handleTable}/>
                            <input type="text" name="comment" className="form-control mt-2" placeholder="Comment" onChange={handleTable}/>
                            <textarea type="text" name="description" rows="8" className="form-control mt-2" placeholder="Description" onChange={handleTable}></textarea>
                            <button className="btn btn-primary mt-2">Done</button>
                        </form>
                    </div>

                ) : (<></>)}
                </div>
            </div>

            {table ? (
                <div className='m-3'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className="col-md-2">Name</th>
                                <th scope="col" className="col-md-2">Title</th>
                                <th scope='col' className="col-md-2">Comment</th>
                                <th scope="col" className="col-md-5">Description</th>
                                <th scope="col" className="col-md-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                table.rows.map(r => {
                                
                                    return (
                                    <tr key={r._id} className="rows">
                                                                                
                                        <td >{r.name}</td>
                                        <td>{r.title}</td>
                                        <td>{r.comment}</td>
                                        <td>{r.description}</td>
                                        <td className="td-actions">
                                            <div className="mod ml-2">
                                                <Link className='nav-link p-3' to="#"
                                                onClick={() => editTable(r._id)}
                                                ><i className='fas fa-edit'></i></Link>
                                            </div>
                                            <div className="del ">
                                                <Link className="nav-link p-3" to="#"
                                                onClick={() => deleteRow(r._id)}
                                                ><i className="fas fa-trash"></i></Link>
                                            </div>

                                        </td>

                                    </tr>    

                                    )
                                })

                            }
 
                        </tbody>
                    </table>

                         {modifyTable._id  ? (
                                 <div className="col-md-12">
                                    <div className="card card-body">
                                        <form onSubmit={editSubmit}>
                                             <input type="text" name="name" className="form-control mt-2" placeholder="Name"  onChange={handleEdit} value={modifyTable.name}/>
                                             <input type="text" name="title" className="form-control mt-2" placeholder="Title" onChange={handleEdit} value={modifyTable.title}/>
                                             <input type="text" name="comment" className="form-control mt-2" placeholder="Comment" onChange={handleEdit} value={modifyTable.comment}/>
                                             <textarea type="text" name="description" rows="8" className="form-control mt-2" placeholder="Description" onChange={handleEdit} value={modifyTable.description}></textarea>
                                            <div className="d-flex">
                                                <div className="float-start">
                                                    <button className="btn btn-success m-2">Edit</button>
                                                </div>
                                                <div className="float-start">
                                                    <button className="btn btn-primary m-2"
                                                    onClick={() =>setModifyTable({_id: ''})}
                                                    >Cancel</button>
                                                </div>
                                            </div>
                                        </form>            
                                    </div>
                                 </div>
                             ) : (
                                 <></>
                             )}


                </div>
            ) : (<></>)}

        </div>
    )
}

export default Table;
