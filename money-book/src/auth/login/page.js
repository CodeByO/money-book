import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import {Form} from "react-bootstrap";
import axios from 'axios';
import './design.css';
function Login(props){
    const [LoginCheck,setLoginCheck] = useState(false);
    const [LoginErr,setLoginErr] = useState(false);
    const history = useHistory();
    
    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={(e)=>{
                e.preventDefault()
                let userInputData = {
                    id : e.target.formBasicId.value,
                    pw : e.target.formBasicPw.value,
                }
                axios({
                    method : 'POST',
                    url : '/auth/local',
                    data : {id: userInputData.id, pw:userInputData.pw},
                }).then((result)=>{setLoginCheck(result.data.userLogin);setLoginErr(result.data.LoginErr)})
            }}>
                <h3>로그인</h3>

                    <Form.Group controlId="formBasicId">
                        <Form.Control type="text" placeholder="아이디" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPw">
                        <Form.Control type="password" placeholder="비밀번호" />
                    </Form.Group>
                    <button type="submit" className="btn btn-primary btn-block">로그인</button>
            </form>
            <Link className="nav-link" to={"/sign-up"}>회원가입</Link>
            {
                LoginCheck ? history.push('/list')
                            : null
            }
            {
                 LoginErr ? <p>아이디 또는 비번이 틀렸습니다.</p>
                 : null
            }

            </div>

        </div>

    )
}

export default Login;