import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Signup(){

    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);

        const config = {     
            headers: { 'enctype': 'multipart/form-data' }
        }

        axios.post('http://localhost:3004/signup',datastring,config)
        .then(function(res){
            if(res.data.status ==='Created'){
                alert('Created');
                window.location.reload();
            }
            else{
                alert('Error');
                window.location.reload();
            }
        })
        .catch(function(err){
            alert(err);
            window.location.reload();
        });
        
    }

    return (
    <>
    <form onSubmit={handlesubmit}>
    <div className="row">
    <div className="table-responsive">
        <table width="30%" align="center" border="1">
        <thead>
            <tr align="center">
                <th colspan={2}>Signup Page</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Name</td>
                <td><input type="text" name="sname" id="name" placeholder='Name'/></td>
            </tr>
            <tr>
                <td>Email ID</td>
                <td><input type="email" name="semail" id="email" placeholder='Email ID'/></td>
            </tr>
            <tr>
                <td>Phone No.</td>
                <td><input type="number" name="sphone" id="phone" placeholder='Phone No'/></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password" name="spassword" id="password" placeholder='password'/></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <button type="submit" name="data_submit" id="data_submit" value="submit"
                    className="btn btn-primary">
                        Signup
                    </button>
                    <Link to="/">
                        <button type="button" className="btn btn-danger">
                            Signin
                        </button>
                    </Link>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
    </form>
    </>
    );
}