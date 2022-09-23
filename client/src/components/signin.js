import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export function Signin(){

    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);

        const config = {     
            headers: { 'enctype': 'multipart/form-data' }
        }

        axios.post('http://localhost:3004/signin',datastring,config)
        .then(function(res){
            if(res.data.status === 'error'){
                alert('Login Invalid');
                window.location.reload();
            }
            else{
                alert('Login valid');
                var id = res.data.status;
                localStorage.setItem('id',id);
                window.location.href="./dashboard";
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
                <th colSpan={2}>Signin Page</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Username</td>
                <td><input type="text" name="username" id="username" placeholder='Username'/></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password" name="password" id="password" placeholder='password'/></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <button type="submit" name="data_submit" id="data_submit" value="submit"
                    className="btn btn-primary">
                        Signin
                    </button>
                    <Link to="/signup">
                    <button type="button" className="btn btn-danger">Signup</button>
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