import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../App';
import { useEffect } from 'react';

const Edit = () => {

    const {id} = useParams()

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({title:"",body:""})
    const [error, setError] = useState(null);

    const handleChange = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value })
    }

    const handleFormsubmit = (event)=>{
        event.preventDefault();
        let data = {title:inputs.title, body:inputs.body}
        axios.put(BASE_URL+'/api/posts/'+id, data).then(()=>{
            navigate('/')
        }).catch(()=>{
            setError('Unable to update post. Please check the database connection...')
        })
    }

    const getEditPost =()=>{
        axios.get(BASE_URL+'/api/posts/'+id+'/edit')
        .then((response)=>response.data)
        .then((response_data)=>{
            let post = response_data.data;
            setInputs({title:post.title, body:post.body})
        })
    }

    useEffect(()=>{
        getEditPost();
      },[])

  return (
    <div>
      <div className="container">
        <h3>Edit Post</h3>
        <Link to="/" className="btn btn-info">Back</Link>
        <form action="" onSubmit={handleFormsubmit}>

            <div className="form-group">
                <label htmlFor="">Title</label>
                <input className="form-control" type="text" onChange={handleChange} name="title" value={inputs.title} id="" />
            </div>

            <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea className="form-control" onChange={handleChange} name="body" value={inputs.body} id="" rows="6"></textarea>
            </div>

            <div className="form-group">
                <button className="btn btn-success mt-2">Update</button>
                {error?(<p className="text-danger mt-2">{error}</p>):""}
            </div>

        </form>
           
    </div>
    </div>
  )
}

export default Edit
