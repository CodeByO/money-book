
import React,{useEffect,useState}from "react";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";
import {Form} from 'react-bootstrap';
import { unstable_batchedUpdates } from "react-dom";

function PostSubPayment(props){
    useEffect(()=>{
        console.log('첫 렌더');
        let isComponentMounted = true;
        const fetchData = async ()=>{
          const urls = [
            `/api/payment`,
          ];
          const promises = urls.map((cur)=>{
            return axios.get(cur);
          })
          const resolvedRes = await Promise.all(promises);
          if(isComponentMounted){
            unstable_batchedUpdates(()=>{
              resolvedRes.map((cur)=>{
                const url = cur.config.url;
                if(url === `/api/payment`){
                  setMainPayment(cur.data.Data);
                  console.log("setMainpayment : " + cur.data);
                }
              });
            });
          }
        };
        fetchData();
        return ()=>{
          isComponentMounted = false;
        }
      },[])
    let [MainPayment,setMainPayment] = useState()
    let history = useHistory();
    return (
        <div className='auth-wraaper'>
             <div className="auth-inner">
               <h3>새로운 세부 자산</h3>
               <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    main_id : e.target.main_id.value,
                    sub : e.target.sub.value,
                    balance : e.target.balance.value,
                };
                axios({
                    method : 'POST',
                    url : '/payment/sub',
                    data : {main_id:userInputData.main_id,sub:userInputData.sub,balance:userInputData.balance},
                }).then((result)=>{if(result.data.result=='Success'){
                    history.push('/category')
    
                }})
            }}>
            <Form.Group>
                <Form.Label>메인 자산</Form.Label>
                <Form.Control as="select" name="main_id">
                <option defaultValue="0" disabled>선택</option>
                {
                        MainPayment && MainPayment.map((data,index)=>{
                        return(
                            <option value={data._id} key={data._id}>{data.main}</option>
                        )
                    })
                }
                </Form.Control>
            </Form.Group>
            <Form.Group >
                <Form.Label>세부 결제 수단</Form.Label>
                    <Form.Control type="text" defaultValue="기타" name="sub"/>
                        <Form.Text className="text">
                </Form.Text>
            </Form.Group>
            <Form.Group >
                <Form.Label>잔액</Form.Label>
                    <Form.Control type="number" defaultValue="10000" name="balance"/>
                        <Form.Text className="text">
                </Form.Text>
            </Form.Group>

          <button type="submit" class="btn btn-primary">등록</button>  
          <Link to={'/category'}> 뒤로가기 </Link>
        </form> 
             </div>
    </div>
    )
}

export default PostSubPayment;