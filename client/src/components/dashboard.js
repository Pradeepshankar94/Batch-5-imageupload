import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Dashboard(){

    var id = localStorage.getItem('id');

    const [userdetails,setUserdetails] = useState([]);

    useEffect(()=>{
        load_userdetails();
    });

    const load_userdetails = () => {
        var datastring = {id:id};
        axios.post("http://localhost:3004/getuserdetails",datastring)
        .then(function(res){
            setUserdetails(res.data);
        })
    }

    const logout = () => {
        localStorage.clear();
        window.location.href="./";
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
    </>
    );
}