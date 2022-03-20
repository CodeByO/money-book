import React, {useState,useEffect } from "react";
import {Form,Modal,Button} from 'react-bootstrap';

import {Link } from "react-router-dom";
import axios from "axios";



function PostList(props){
    const [inputs,setInputs] = useState({
        InAndOut : '',
        main : ' '
    });
    
    const {InAndOut, main} = inputs;
    const onChange = (e) =>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
       console.log(inputs)
        
    };

    let [CatOutLength,setCatOutLength] = useState()
    let [CatInLength,setCatInLength] = useState()
    let [SubCatLength,setCatLength] = useState();

      
      useEffect(()=>{
        setCatOutLength(props.Category&&props.Category.filter(v=>v.InAndOut == "지출"));
        setCatInLength(props.Category&&props.Category.filter(v=>v.InAndOut == "수입"));

      },[props.Category])
      useEffect(()=>{
          setCatLength(props.Category&&props.Category.filter(v=>v._id == main));
          console.log(SubCatLength);  
        },[main])
    
    let today = new Date();
    let year = today.getFullYear();
    let month = ("00" + (today.getMonth() + 1)).slice(-2);
    let date = ("00" + (today.getDate())).slice(-2);
    let hours = today.getHours(); // 시
    let minutes = ("00" + (today.getMinutes() + 1)).slice(-2);  // 분
    let [Checked,setChecked] = useState(false);
    


    let handleChange = (checked) =>{
        console.log(checked)
            setChecked(checked) 
    }



    const [lgShow, setLgShow] = useState(false);
    return(
        <div>
      <Button onClick={() => setLgShow(true)}>추가</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
                상세내역
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    list_id : e.target.list_id.value,
                    InAndOut : e.target.InAndOut.value,
                    list_date : e.target.list_date.value,
                    list_time : e.target.list_time.value,
                    mainCategory : e.target.main.value,
                    subCategory : e.target.category_sub.value,
                    contents : e.target.contents.value,
                    payment : e.target.payment.value,
                    paymentDst : e.target.payment_dst.value,
                    price : e.target.price.value,
                    OutOfList : e.target.out_of_list.value,
 
                };
                axios({
                    method : 'POST',
                    url : '/post/list',
                    data : {userInputData},
                }).then((result)=>{if(result.data.result=='Success'){
                    window.location.replace('/list')
                }})
            }}>
             <Form.Group>
                    <Form.Label>수입/지출/이체</Form.Label>
                    <Form.Control onChange={onChange} as="select" name="InAndOut">
                    <option selected value="1">선택</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                    <option value="이체">이체</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                        <Form.Label>날짜</Form.Label>
                            <Form.Control type="text"  defaultValue={year+"-"+month+"-"+date} name="list_date"/>
                        <Form.Text className="text-muted">
                        연도월일 로 입력해주세요
                    </Form.Text>
                    </Form.Group> 
            <Form.Group>
                <Form.Label>시간</Form.Label>
                    <Form.Control type="text"  defaultValue={hours+":"+minutes+":"+date} name="list_time"/>
                     <Form.Text className="text-muted">
                     시간분초로 입력해주세요
                 </Form.Text>
            </Form.Group>
            <Form.Group>
                     <Form.Label>메인 카테고리</Form.Label>
                         <Form.Control onChange={onChange} as="select" name="main">
                                <option defaultValue="-1">선택</option>
                                {
                                InAndOut == "수입"
                                ?CatInLength&&CatInLength.map((data,index)=>{
                                     return(
                                         <option value={data._id} key={data._id}>
                                             {data.main}
                                         </option>
                                        )
                                 })
                                :InAndOut == "지출"
                                ?CatOutLength&&CatOutLength.map((data,index)=>{
                                    return(
                                        <option value={data._id} key={data._id}>
                                            {data.main}
                                         </option>
                                      )
                                 })
                                :InAndOut == "이체"
                                ?props.Category&&props.Category.map((data,index)=>{
                                    return (
                                        <option value={data._id} key={data._id}>
                                        {data.main}
                                        </option>
                                    )
                                })
                                : null
                                }
                            </Form.Control>
                    </Form.Group>
                <Form.Group>
                    <Form.Label>서브 카테고리</Form.Label>
                        <Form.Control as="select" name="category_sub">
                            <option  disabled defaultValue="-1">선택</option>
                            {    
                                                 
                            SubCatLength && SubCatLength.map((data,index)=>{
                                
                                return(
                                    data.sub.map((subData,index)=>{
                                                    
                                        return (
                                            <option value={subData._id}key={subData._id}>{subData.sub}</option>
                                        )
                                    })
                                )
                            })
                               
                            }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>내용</Form.Label>
                    <Form.Control type="text"  defaultValue="내용" name="contents"/>
                </Form.Group>
                <Form.Group>
                     <Form.Label>결제 수단</Form.Label>
                         <Form.Control as="select" name="payment">
                            <option defaultValue='-1' disabled>선택</option>
                            {
                               props.Payment && props.Payment.map((data,index)=>{
                                        {
                                            return(
                                                data.sub.map((subData,index)=>{
                                                    
                                                    return (
                                                        <option value={subData._id}key={subData._id}>{subData.sub}</option>
                                                    )
                                                })
                                            )
                                        }
                                })
                            }
                            </Form.Control>
                    </Form.Group>
          {
              InAndOut == "이체"
              ?<Form.Group>
              <Form.Label>결제 수단</Form.Label>
                  <Form.Control as="select" name="payment_dst">
                     <option defaultValue='0'>선택</option>
                     {
                               props.Payment && props.Payment.map((data,index)=>{
                                        {
                                            return(
                                                data.sub.map((subData,index)=>{
                                                    
                                                    return (
                                                        <option value={subData._id}key={subData._id}>{subData.sub}</option>
                                                    )
                                                })
                                            )
                                        }
                                })
                            }
                     </Form.Control>
             </Form.Group>
              :<div class="form-group"> 
              <input type="hidden" class="form-control" name="payment_dst" defaultValue="0"/>
               </div>
          }
          <Form.Group>
             <Form.Label>금액</Form.Label>
                <Form.Control type="number"  defaultValue="10000" name="price" />
            </Form.Group>
          <Form.Group>
              <Form.Label>내역 제외</Form.Label>
              <Form.Control type="checkbox" onChange={(e)=>handleChange(e.currentTarget.checked)}checked={Checked}/>
              {
                  Checked ?<input type="hidden" class="form-control" name="out_of_list" value="1"/> 
                  :<input type="hidden" class="form-control" name="out_of_list" value="0"/>
              }
          </Form.Group>
          <div class="form-group"> 
            <input type="hidden" class="form-control" name="list_id" value="new"/>
          </div>
          <button type="submit" class="btn btn-primary">등록</button>  
          <Link to={'/list'}> 뒤로가기 </Link>
        </form>
        </Modal.Body>
      </Modal>
        </div>
    );
}

export default PostList;