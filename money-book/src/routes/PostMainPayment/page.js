
import React,{useState}from "react";
import { Link, useHistory } from "react-router-dom";
import {Form} from 'react-bootstrap';
import axios from 'axios';
function PostMainPayment(props){
    let history = useHistory();
    return (
        <div className='auth-wraaper'>
             <div className="auth-inner">
               <h3>새로운 결제수단</h3>
               <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    main : e.target.main.value,
 
                };
                axios({
                    method : 'POST',
                    url : '/payment/main',
                    data : {inandout:userInputData.inandout,main:userInputData.main,sub:userInputData.sub},
                }).then((result)=>{if(result.data.result=='Success'){
                    history.push('/category')
    
                }})
            }}>
             <Form.Group >
                <Form.Label>메인 결제수단</Form.Label>
                    <Form.Control type="text" defaultValue=" " name="main"/>
                        <Form.Text className="text">
                </Form.Text>
                <Link to={"/post/payment/sub"}>세부 결제수단 추가하기</Link>  
            </Form.Group>
    
         
          <button type="submit" class="btn btn-primary">등록</button>  
          <Link to={'/category'}> 뒤로가기 </Link>
        </form> 
             </div>
    </div>
    )
}

export default PostMainPayment;