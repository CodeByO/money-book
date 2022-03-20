
import React,{useState}from "react";
import { Link, useHistory } from "react-router-dom";
import {Form} from "react-bootstrap";
import axios from 'axios';


function PostMainCategory(props){
    let history = useHistory();
    let [Input,setInput] = useState(1);
    return (
        <div className='auth-wraaper'>
             <div className="auth-inner">
               <h3>새로운 카테고리</h3>
               <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    inandout : e.target.inandout.value,
                    main : e.target.main.value,
                    sub : e.target.sub.value,
 
                };
                axios({
                    method : 'POST',
                    url : '/category/main',
                    data : {inandout:userInputData.inandout,main:userInputData.main,sub:userInputData.sub},
                }).then((result)=>{if(result.data.result=='Success'){
                    history.push('/category')
    
                }})
            }}>
             <Form.Group>
                    <Form.Label>수입/지출</Form.Label>
                    <Form.Control as="select" name="inandout">
                    <option selected disabled value="1">선택</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group >
                <Form.Label>메인 카테고리</Form.Label>
                    <Form.Control type="text" defaultValue=" " name="main"/>
                        <Form.Text className="text">
                </Form.Text>
            </Form.Group>
            <Form.Group >
                <Form.Label>세부 카테고리</Form.Label>
                    <Form.Control type="text" defaultValue="기타" name="sub"/>
                        <Form.Text className="text">
                </Form.Text>
                <Link to={"/post/category/sub"}>세부 카테고리만 추가하기</Link>  
            </Form.Group>

                
            
          <button type="submit" class="btn btn-primary">등록</button>  
          <Link to={'/category'}> 뒤로가기 </Link>
        </form> 
             </div>
    </div>
    )
}

export default PostMainCategory;