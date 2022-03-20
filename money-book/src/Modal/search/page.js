import React,{useEffect,useState}from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Form,Col,Modal,Button} from "react-bootstrap";

import './design.css';


function Search(props){
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
        setCatOutLength(props.MainCategory&&props.MainCategory.filter(v=>v.inandout == "지출"));
        setCatInLength(props.MainCategory&&props.MainCategory.filter(v=>v.inandout == "수입"));
        setSubCatLength(props.SubCategory&&props.SubCategory.filter(v=>v.main_id == category_main));
    };
    let [SubCatLength,setSubCatLength] = useState();
    let [CatOutLength,setCatOutLength] = useState();
    let [CatInLength,setCatInLength] = useState();
    let [SearchList, setSearchList] = useState();

    
    let history = useHistory();
    const [lgShow, setLgShow] = useState(false);
    return(
        <div>
      <Button onClick={() => setLgShow(true)}>검색</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
    <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
                검색
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    inandout : e.target.inandout.value,
                    contents : e.target.contents.value,
                    payment : e.target.payment.value,
                    category_main : e.target.category_main.value,
                    category_sub : e.target.category_sub.value,
                    date_min : e.target.dateMin.value,
                    date_max : e.target.dateMax.value,
                    price_min : e.target.priceMin.value,
                    price_max : e.target.priceMax.value
                };
                axios({
                    method : 'POST',
                    url : '/api/search',
                    data : {userInputData},
                }).then((result)=>{props.setMonthList(result.data.Data);setLgShow(false)})
            }}>

                <Form.Group>
                    <Form.Label>수입/지출/이체</Form.Label>
                    <Form.Control onChange={onChange} as="select" name="inandout">
                    <option selected disabled value="1">선택</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                    <option value="이체">이체</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>내용</Form.Label>
                    <Form.Control type="text" defaultValue="-1" name="contents"/>
                    <Form.Text className="text-muted">
                     검색에서 제외하실거면 -1로 해주세요
                    </Form.Text>
                </Form.Group>

                  <Form.Group>
                     <Form.Label>메인 카테고리</Form.Label>
                         <Form.Control onChange={onChange} as="select" name="category_main">
                              <option selected value="-1">선택</option>
                                {
                                inandout == "수입"
                                ?CatInLength.map((data,index)=>{
                                     return(
                                         <option value={data.id} key={data.id}>
                                             {data.main}
                                         </option>
                                        )
                                 })
                                :inandout == "지출"
                                ?CatOutLength.map((data,index)=>{
                                    return(
                                        <option value={data.id} key={data.id}>
                                            {data.main}
                                         </option>
                                      )
                                 })
                                :null
                                }
                            </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                     <Form.Label>서브 카테고리</Form.Label>
                         <Form.Control as="select" name="category_sub">
                              <option selected value="-1">선택</option>
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
                     <Form.Label>결제 수단</Form.Label>
                         <Form.Control as="select" name="payment">
                            <option value="-1" selected >선택</option>
                            {
                               props.SubPayment && props.SubPayment.map((data,index)=>{
                                    return(
                                        <option value={data.id} key={data.id}>{data.sub}</option>
                                    )
                                })
                            }
                            </Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                        <Form.Group>
                        <Form.Label>날짜(~부터)</Form.Label>
                            <Form.Control type="text" defaultValue="-1" name="dateMin"/>
                        <Form.Text className="text-muted">
                        검색에서 제외하실거면 -1로 해주세요 예) 2022-01-01
                    </Form.Text>
                    </Form.Group>        
                        </Col>
                        <Col>
                        <Form.Group>
                        <Form.Label>날짜(~까지)</Form.Label>
                            <Form.Control type="text" defaultValue="-1" name="dateMax"/>
                        </Form.Group>
                        </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                            <Form.Group>
                                <Form.Label>금액(~부터)</Form.Label>
                                    <Form.Control type="number" defaultValue="-1" name="priceMin" />
                                <Form.Text className="text-muted">
                                검색에서 제외하실거면 -1로 해주세요
                            </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                        <Form.Label>금액(~까지)</Form.Label>
                            <Form.Control type="number" defaultValue="-1" name="priceMax" />

                        </Form.Group>
                        </Col>
                        </Form.Row>
                    <button type="submit" className="btn btn-primary btn-block">검색하기</button>
                    <button className="btn btn-primary btn-block" onClick={()=>{history.goBack()}}>뒤로가기</button>
            </form>
            </Modal.Body>
      </Modal>

</div>

    )
}

export default Search;