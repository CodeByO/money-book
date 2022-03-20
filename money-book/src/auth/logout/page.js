import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {Form} from "react-bootstrap";
import axios from 'axios';
import './design.css';
function LogOut(){
    let history = useHistory()
    useEffect(()=>{
        axios({
            method : 'GET',
            url : '/auth/local/out',
            
        }).then((result)=>{setCheckLogout(result.data.result)})
    })
    
    let [CheckLogout, setCheckLogout] = useState()

    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
            </div>
            {
                CheckLogout == 'Success'
                ? history.push('/')
                : null

            }
        </div>

    )
}

export default LogOut;