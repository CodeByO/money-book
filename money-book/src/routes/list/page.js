import React, { useEffect, useState,useMemo } from "react";
import { unstable_batchedUpdates } from "react-dom";
import GlobalStyles from "./GlobalStyles";
import {Button,Form} from 'react-bootstrap'
import axios from 'axios';
import { useHistory } from "react-router-dom";

import SideBarUser from "../../components/SideBar/page";
import Jumbotron from "../../components/Jumbotron/page";
import Detail from "../../Modal/detail/page";


import "./design.css";
import PostList from "../../Modal/PostList/page";
import Search from "../../Modal/search/page";

function List() {
 let history = useHistory();
 var now = new Date();

 let [InMonth,setInMonth] = useState(("00" + (now.getMonth() + 1)).slice(-2));
 let [InYear,setInYear] = useState(now.getFullYear());
 let [UserDate, setUserDate] = useState(InYear+"-"+InMonth);

 let [AcCheckBox,setAcCheckBox] = useState(false);


 const [checkedInputs, setCheckedInputs] = useState([]);

 const changeHandler = (checked, id) => {
   if (checked) {
     setCheckedInputs([...checkedInputs, id]);
   } else {
     // 체크 해제
     setCheckedInputs(checkedInputs.filter((el) => el !== id));
   }
 };
const DeleteButtonHandler = () => {
  for(var i = 0; i< checkedInputs.length; i++){
    console.log(checkedInputs[i])
    axios({
      method : 'post',
      url : '/list/remove',
      data : {
        list_id : checkedInputs[i]
      }
    } 
    ).then((result)=>{
      console.log(result);
      if(result.data.result == "Success"){
        window.location.replace("/list")
      }
    })
  }
}


let [MonthList, setMonthList] = useState();
let [Amount, setAmount] = useState();
let [Payment,setPayment] = useState();
let [Category,setCategory] = useState();

// useEffect(()=>{
//   if(InMonth == 13){
//     setInYear(InYear+1);
//     setInMonth(("00" + (InMonth - 12)).slice(-2));
//     setUserDate(InYear+"-"+InMonth);
//   }
//   if(InMonth == 0){
//     setInYear(InYear-1);
//     setInMonth(("00" + (InMonth + 12)).slice(-2));
//     setUserDate(InYear+"-"+InMonth);
//   }
// },[UserDate])



useEffect(()=>{
 axios(
   '/api/category'
 ).then((result)=>{setCategory(result.data.Data)})
 axios(
  '/api/payment'
).then((result)=>{setPayment(result.data.Data)})

axios(
  '/api/list/'+UserDate
).then((result)=>{setMonthList(result.data.Data)})
axios(
  '/api/DayAmount/'+UserDate
).then((result)=>{setAmount(result.data.Data)})
if(InMonth == 13){
  setInYear(InYear+1);
  setInMonth(("00" + (InMonth - 12)).slice(-2));
  setUserDate(InYear+"-"+InMonth);
}
if(InMonth == 0){
  setInYear(InYear-1);
  setInMonth(("00" + (InMonth + 12)).slice(-2));
  setUserDate(InYear+"-"+InMonth);
}
if(MonthList != undefined){
  const SortedMonthList =MonthList.slice(0)
    .sort((a,b)=>{console.log(b.list_date.valueOf().subString(8,10)+ "/"+a.list_date.valueOf());return b.list_date.valueOf().subString(8,10) - a.list_date.valueOf().subString(8,10)})
    setMonthList(SortedMonthList)
}
},[UserDate])


useEffect(()=>{
  if(MonthList != undefined){
    const SortedMonthList = ()=>{MonthList.slice(0)
      .sort((a,b)=>{console.log(new Date(b.list_date));return new Date(b.list_date).valueOf() - new Date(a.list_date).valueOf()})
      setMonthList(SortedMonthList())}
  }

  
},[UserDate])





  return (
   
    <div className="List">
    <GlobalStyles />

    <SideBarUser />

    <div class="container">
        <div class="row">
          <div class="col-12">
          <Jumbotron Year={InYear} Month={InMonth} setYear={setInYear} setMonth={setInMonth} setUserDate={setUserDate} data={Amount}></Jumbotron>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
        <div className="left-button">

        
      </div>
      <div className="right-button">
      <div className="right-button"><Search setMonthList={setMonthList} Category={Category || undefined} Payment={Payment || undefined}></Search></div>
      <div className="right-button"><PostList setMonthList={setMonthList} Category={Category || undefined} Payment={Payment || undefined}></PostList></div>
      <div className="right-button"><Button onClick={()=>{setAcCheckBox(!AcCheckBox)}}>삭제</Button></div>
     
 
      </div>
          </div>

        </div>
      <div class="row">
        <div class="col-12">
        {
         
          MonthList && MonthList.map((data,index)=>{
            return(
              <ul class="list-group" key={index}>
                {
                  data.out_of_list === 0
                  ? <li class="list-group-item d-flex justify-content-between align-items-center" >
                   { 
                    AcCheckBox 
                    ?<Form.Check id={data.list_id} type="checkbox" onChange={(e)=>{
                      changeHandler(e.currentTarget.checked, data.list_id)
                       }} checked={checkedInputs.includes(data.list_id) ? true : false} />
                      
                  //   ? <span><input id={index}type="checkbox" 
                  //   onChange={()=>{
                  //     changeHandler(index, data.list_id)
                  //   }}
                  //   checked={checkedInputs.includes(index) ? true : false}
                  // /></span>
                    : null
                  }
                  <span>{data.list_date}</span>
                  {data.list_time}
    
                  <span>{ Category && Category.find(v=>v.id === data.main).main}/{Category && Category.find(v=>v.id === data.sub).sub}</span>
                  <span>{MonthList && data.contents}</span>
                  <span>{Payment && Payment.find(v=>v.id === data.payment).sub}</span>
                  {
                   data.inandout=="수입"
                    ? <span style={{color : 'blue'}}>{priceToString(data.price)}</span>
                    : data.inandout=="지출"
                    ? <span style={{color : 'red'}}>{priceToString(data.price)}</span>
                    : data.inandout=="이체"
                    ? <span style={{color : 'gary'}}>{priceToString(data.price)}</span>
                    : null
                    
                    
                  }
                  <span><Detail Data={data} Category={Category} Payment={Payment}></Detail></span>
                  </li>
                  : <li class="list-group-item d-flex justify-content-between align-items-center"style={{color:'gray'}}>
                  {
                    AcCheckBox 
                    ?<Form.Check id={data.list_id} type="checkbox" onChange={(e)=>{
                      changeHandler(e.currentTarget.checked, data.list_id)
                       }} checked={checkedInputs.includes(data.list_id) ? true : false} />
                   : null
                 }
                 <span>{data.list_date}</span>
                 {data.list_time}
   
                 <span>{ Category && Category.find(v=>v.id === data.category_main).main}/{Category && Category.find(v=>v.id === data.category_sub).sub}</span>
                 <span>{MonthList && data.contents}</span>
                 <span>{Payment && Payment.find(v=>v.id === data.payment).sub}</span>
                 {
                  data.inandout=="수입"
                   ? <span style={{color : 'blue'}}>{priceToString(data.price)}</span>
                   : data.inandout=="지출"
                   ? <span style={{color : 'red'}}>{priceToString(data.price)}</span>
                   : data.inandout=="이체"
                   ? <span style={{color : 'gary'}}>{priceToString(data.price)}</span>
                   : null
                   
                   
                 }
                 <span><Detail Data={data} Category={Category} Payment={Payment}></Detail></span>
                 </li>
                  }

              </ul>
            )
          })
        }  

        </div>
      </div>
              {
                AcCheckBox
                ? <footer class="bg-light text-center text-lg-start">
                  <div class="text-center p-3" style={{'backgroundColor': 'rgba(0, 0, 0, 0.2)'}}>
              
                    <Button onClick={()=>{DeleteButtonHandler()}}>삭제하기</Button>
                  
                </div>
              
              </footer>
              : null
              }
    </div>
 
  </div>
  );
  function timeToString(time){
    if(time.toString().length == 4){

      var output = ['0',time.toString().slice(0,1),':', time.toString().slice(1,3)].join('')

    }else if(time.toString().length == 5)
    {
      var output = ['0',time.toString().slice(0, 1), ':', time.toString().slice(1,3)].join('');
    }else{
      var output = [time.toString().slice(0, 2), ':', time.toString().slice(2,4)].join('');
    }
    return output;
  }

  function priceToString(price) {
    return [price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),"원"];
}
}

export default List;

