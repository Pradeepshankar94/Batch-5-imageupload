import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Image(){

    var id = localStorage.getItem('id');

    const [userdetails,setUserdetails] = useState([]);
    const [imgdetails,setImgdetails] = useState([]);

    useEffect(()=>{
       load_userdetails();load_imgdetails();
    });

    const load_userdetails = () => {
        var datastring = {id:id};
        axios.post("http://localhost:3005/getuserdetails",datastring)
        .then(function(res){
            setUserdetails(res.data);
        })
    }

    const load_imgdetails = () => {
        var datastring = {id:id};
        axios.post("http://localhost:3005/getimgdetails",datastring)
        .then(function(res){
            setImgdetails(res.data);
        })
    }

    const logout = () => {
        localStorage.clear();
        window.location.href="./";
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {
            headers:{"enctype":"multipart/form-data"}
        };

        axios.post('http://localhost:3005/image_upload',datastring,config)
        .then(function(res){
            if(res.data.status === 'Uploaded'){
                alert('Image Uploaded');
                window.location.reload();
            }
            else{
                alert(res.data);
                window.location.reload();
            }
        })
        .catch(function(res){
            alert(res);
            window.location.reload();
        })
    }

    return (
    <>
        
        <div className="container">
        <div className="row mt-2">
        <Link to="/dashboard"><button className="btn btn-primary">Home</button></Link>&nbsp;
        <Link to="/image"><button className="btn btn-secondary">Image</button></Link>&nbsp;
        <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
        <div className="row mt-2">
        <table width="50%" align="left" border="1">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
        </tr>
        </thead>
        <tbody>
        {userdetails.map((value,index)=>(
            <tr key={index}>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
        <div className="container">
        <div className="row mt-5">
        <form onSubmit={handlesubmit} id="sample">
            <div className="table-responsive">
            <table border="1">
                <thead>
                    <tr align='center'>
                        <th colSpan="2">Image Upload</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Files</td>
                        <td>
                            <input type="hidden" name="id" id="id" value={id}/>
                            <input type="file" name="img_file" id="img_file"/></td>
                    </tr>
                    <tr>
                        <td>File Description</td>
                        <td><input type="text" name="img_descr" id="img_descr" placeholder='Description'/></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>
                        <button type="submit" name="data_submit" id="data_submit" value="submit"
                        className='btn btn-danger'>Upload</button>  
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </form>
        </div>
        </div>
        <div className='container'>
        <div className="row mt-4">
        <table width="50%" align="left" border="1">
        <thead>
        <tr>
            <th>Image</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {imgdetails.map((value,index)=>(
            <tr key={index}>
                <td><img src={'http://localhost:3000/images/'+value.img_name} width="50px" height="50px"/></td>
                <td>{value.img_descr}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
    </>
    );
}