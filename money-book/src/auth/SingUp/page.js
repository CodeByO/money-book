import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import {Form} from "react-bootstrap";
import axios from 'axios';
import './design.css';
function SignUp(porps){
    const [Success,setSuccess] = useState(0);
    const [SignUpErr,setSignUpErr] = useState(0);
    const history = useHistory();

    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={(e)=>{
                e.preventDefault()
                let userInputData = {
                    id : e.target.formBasicId.value,
                    pw : e.target.formBasicPw.value,
                    name : e.target.formBasicName.value,
                    age : e.target.formBasicAge.value,
                }
                axios({
                    method : 'POST',
                    url : 'http://192.168.0.14:8081/auth/local/new',
                    data : {id: userInputData.id, pw:userInputData.pw,name:userInputData.name,age:userInputData.age},
                }).then((result)=>{setSuccess(result.data.SignUp);setSignUpErr(result.data.SignUpErr)})
            }}>
                <h3>회원가입</h3>

                    <Form.Group controlId="formBasicId">
                        <Form.Control type="text" placeholder="아이디" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPw">
                        <Form.Control type="password" placeholder="비밀번호" />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" placeholder="이름" />
                    </Form.Group>
                    <Form.Group controlId="formBasicAge">
                        <Form.Control type="number" placeholder="나이" />
                    </Form.Group>
                    <button type="submit" className="btn btn-primary btn-block">회원가입</button>
            </form>
            <Link className="nav-link" to={"/"}>뒤로가기</Link>
            {
                Success ? history.push('/')
                        : null,
                SignUpErr ? "아이디가 중복입니다."
                          : null
            }
            </div>

        </div>

    )
}

export default SignUp;