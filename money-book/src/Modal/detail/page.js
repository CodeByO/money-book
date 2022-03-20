import React, {useState,useEffect } from "react";
import {Form,Modal,Button} from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router-dom";



function Detail(props){
    const [inputs,setInputs] = useState({
        inandout : '',
        category_main : ' '
    });
    const {inandout, category_main} = inputs;
    const onChange = (e) =>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
        
    };

    let [CatOutLength,setCatOutLength] = useState()
    let [CatInLength,setCatInLength] = useState()
    let [SubCatLength,setSubCatLength] = useState(); 
    useEffect(()=>{
        setCatOutLength(props.MainCategory&&props.MainCategory.filter(v=>v.inandout == "지출"));
        setCatInLength(props.MainCategory&&props.MainCategory.filter(v=>v.inandout == "수입"));
        setChecked(props.Data && props.Data.out_of_list)
      },[props.MainCategory])
      useEffect(()=>{
        setSubCatLength(props.SubCategory&&props.SubCategory.filter(v=>v.main_id == category_main));
      },[category_main])






    let [Checked,setChecked] = useState(false);

    let handleChange = (checked) =>{
        console.log(checked)
            setChecked(checked) 
    }



    const [lgShow, setLgShow] = useState(false);
    return(
        <div>
      <Button onClick={() => setLgShow(true)}>수정</Button>
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
                    inandout : e.target.inandout.value,
                    list_id : e.target.list_id.value,
                    list_date : e.target.list_date.value,
                    list_time : e.target.list_time.value,
                    category_main : e.target.category_main.value,
                    category_sub : e.target.category_sub.value,
                    contents : e.target.contents.value,
                    payment : e.target.payment.value,
                    payment_dst : e.target.payment_dst.value,
                    price : e.target.price.value,
                    out_of_list : e.target.out_of_list.value,
 
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
                    <Form.Control onChange={onChange} as="select" name="inandout">
                    <option selected value={props.Data.inandout}>{props.Data.inandout}</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                    <option value="이체">이체</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                        <Form.Label>날짜</Form.Label>
                            <Form.Control type="text" defaultValue={props.Data.list_date} name="list_date"/>
                        <Form.Text className="text-muted">
                        연도월일 로 입력해주세요
                    </Form.Text>
                    </Form.Group> 
            <Form.Group>
                <Form.Label>시간</Form.Label>
                    <Form.Control type="text" defaultValue={props.Data.list_time} name="list_time"/>
                     <Form.Text className="text-muted">
                     시간분초로 입력해주세요
                 </Form.Text>
            </Form.Group>
            <Form.Group>
                     <Form.Label>메인 카테고리</Form.Label>
                         <Form.Control onChange={onChange} as="select" name="category_main">
                                <option selected  value={props.Data.category_main}>{props.MainCategory&&props.MainCategory.find(v=>v.id == props.Data.category_main).main}</option>
                                {
                                inandout == "수입"
                                ?CatInLength&&CatInLength.map((data,index)=>{
                                     return(
                                         <option value={data.id} key={data.id}>
                                             {data.main}
                                         </option>
                                        )
                                 })
                                :inandout == "지출"
                                ?CatOutLength&&CatOutLength.map((data,index)=>{
                                    return(
                                        <option value={data.id} key={data.id}>
                                            {data.main}
                                         </option>
                                      )
                                 })
                                 :inandout == "이체"
                                 ?props.MainCategory&&props.MainCategory.map((data,index)=>{
                                     return (
                                         <option value={data.id} key={data.id}>
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
                            <option selected value={props.Data.category_sub&&props.Data.category_sub}>{props.SubCategory && props.SubCategory.find(v=>v.id == props.Data.category_sub).sub}</option>
                            {                           
                            SubCatLength && SubCatLength.map((data,index)=>{
                                return(
                                <option value={data.id} key={data.id}>
                                        {data.sub}
                                </option>
                                )
                            })
                                
                            }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>내용</Form.Label>
                    <Form.Control type="text"  defaultValue={props.Data.contents} name="contents"/>
                </Form.Group>
                <Form.Group>
                     <Form.Label>결제 수단</Form.Label>
                         <Form.Control as="select" name="payment">
                            <option value={props.Data.payment}selected>{props.SubPayment && props.SubPayment.find(v=>v.id == props.Data.payment).sub}</option>
                            {
                               props.SubPayment && props.SubPayment.map((data,index)=>{
                                    return(
                                        <option value={data.id}key={data.id}>{data.sub}</option>
                                    )
                                })
                            }
                            </Form.Control>
                    </Form.Group>
          {
              inandout == "이체"
              ?<Form.Group>
              <Form.Label>결제 수단</Form.Label>
                  <Form.Control as="select" name="payment_dst">
                     <option value={props.Data.payment_dst ? props.Data.payment_dst : 0} selected>{props.SubPayment.find(v=>v.id == props.Data.payment_dst)
                     ? props.SubPayment.find(v=>v.id == props.Data.payment_dst).sub
                     : "선택하기"
                    }</option>
                     {
                        props.SubPayment && props.SubPayment.map((data,index)=>{
                             return(
                                 <option value={data.id} key={data.id}>{data.sub}</option>
                             )
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
            <input type="hidden" class="form-control" name="list_id" value={props.Data.list_id}/>
          </div>
          <button type="submit" class="btn btn-primary">등록</button>  
          
        </form>
        </Modal.Body>
      </Modal>
        </div>
    );
}

export default Detail;