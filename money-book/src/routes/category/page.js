import React, { useEffect, useState } from "react";
import {Tabs,Tab,Button} from 'react-bootstrap';
import axios from "axios";
import { unstable_batchedUpdates } from "react-dom";

import SelectAdd from "../../Modal/selectAdd/page";
import SideBarUser from "../../components/SideBar/page";


import './design.css';
function Category(){
    let [Category,setCategory] = useState();
    let [Payment,setPayment] = useState();
    let [CatOutLength,setCatOutLength] = useState();
    let [CatInLength,setCatInLength] = useState();
     
    useEffect(()=>{
      console.log('첫 렌더');
      let isComponentMounted = true;
      const fetchData = async ()=>{
        const urls = [
          `/api/category`,
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
              if(url === `/api/category`){
                setCategory(cur.data.Data);

              }else if(url === `/api/payment`){
                setPayment(cur.data.Data);

              } 
            });
          });
        }
      };

      fetchData();

      return ()=>{
        isComponentMounted = false;
      }
    },[]);
    console.log(Category)
    useEffect(()=>{
      setCatOutLength(Category&&Category.filter(v=>v.InAndOut == "지출"));

      setCatInLength(Category&&Category.filter(v=>v.InAndOut == "수입"));

    },[Category])
    // useEffect(()=>{
    //   const SortedCaIn = CatInLength && CatInLength.slice(0)
    //   .sort((a,b)=>{return a.main_id - b.main_id})
    //   setCatInLength(SortedCaIn);
    //   const SortedCaOut = CatOutLength && CatOutLength.slice(0)
    //   .sort((a,b)=>{return a.main_id - b.main_id})
    //   setCatOutLength(SortedCaOut);
    // },[])

      async function OutOfListIn(event){
        const res = await axios.get('/in/category/sub/'+event)
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  

      }
      async function OutOfListOut(event){
        const res = await axios.get('/out/category/sub/'+event)
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  

      }
      async function OutOfListPay(event){
        const res = await axios.get('/out/payment/'+event)
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  

      }
      async function InOfListPay(event){
        const res = await axios.get('/in/payment/'+event)
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  

      }
      async function RemoveCategory(sub,main){
        const res = await axios.post('/category/remove',{
            sub_id : sub,
            main_id : main
        })
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
      async function RemovePayment(sub,main){
        const res = await axios.post('/payment/remove',{
            sub_id : sub,
            main_id : main
        })
        .then((result)=>{
          if(result.data.result == 'Success'){
            window.location.replace("/category")
          }else if(result.data.result == 'Main Fail'){
            window.location.replace("/category")
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
    return(
        <div>
            <SideBarUser></SideBarUser>
            
           
        <div className="padding">
        <h3>카테고리</h3>
        <SelectAdd></SelectAdd>
        <Tabs defaultActiveKey="InCome" id="uncontrolled-tab-example">
            <Tab eventKey="InCome" title="수입">
            <div class="row">
        <div class="col-12">
        
        
        {
            CatInLength&&CatInLength.map((data,index)=>{
                return( 
                  <ul class="list-group">
                    
                  {data.sub.map((subName,index)=>{
                      return(
                        <li class="list-group-item d-flex justify-content-between align-items-center" key={subName.id}>
                        <span>{data.main}</span>
                        <span>{subName.sub}</span>
                      {
                        subName.OutOfList
                        ? <span><Button onClick={()=>{OutOfListIn(subName._id)}}>내역포함</Button></span>
                        : <span><Button onClick={()=>{OutOfListOut(subName._id)}}>내역제외</Button></span>
                      }
                      <span><Button onClick={()=>{RemoveCategory(subName._id,data._id)}}>삭제</Button></span>
                  </li>
                    
                      )
                      console.log(subName)
                  })}
   
                  </ul>
                )
            })
        }
        
            
        </div>
      </div>
            </Tab>
            <Tab eventKey="OutCome" title="지출">
            {
            CatOutLength&&CatOutLength.map((data,index)=>{
                return( 
                  <ul class="list-group">
                    
                  {data.sub.map((subName,index)=>{
                      return(
                        <li class="list-group-item d-flex justify-content-between align-items-center" key={subName.id}>
                        <span>{data.main}</span>
                        <span>{subName.sub}</span>
                      {
                        subName.OutOfList
                        ? <span><Button onClick={()=>{OutOfListIn(subName._id)}}>내역포함</Button></span>
                        : <span><Button onClick={()=>{OutOfListOut(subName._id)}}>내역제외</Button></span>
                      }
                      <span><Button onClick={()=>{RemoveCategory(subName._id,data._id)}}>삭제</Button></span>
                  </li>
                    
                      )
                  })}
   
                  </ul>
                )
            })
        }
            </Tab>
            <Tab eventKey="Payment" title="결제수단">
            {
            Payment&&Payment.map((data,index)=>{
                return( 
                  <ul class="list-group">
                    
                  {data.sub.map((subName,index)=>{
                      return(
                        <li class="list-group-item d-flex justify-content-between align-items-center" key={subName.id}>
                        <span>{data.main}</span>
                        <span>{subName.sub}</span>
                        <span>{priceToString(subName.Balance)}</span>
                      {
                        subName.OutOfList
                        ? <span><Button onClick={()=>{OutOfListIn(subName._id)}}>내역포함</Button></span>
                        : <span><Button onClick={()=>{OutOfListOut(subName._id)}}>내역제외</Button></span>
                      }
                      <span><Button onClick={()=>{RemoveCategory(subName._id,data._id)}}>삭제</Button></span>
                  </li>
                    
                      )
                  })}
   
                  </ul>
                )
            })
        }
            </Tab>
            </Tabs>  
        </div>
        </div>
    );
}
function priceToString(price) {
  return [price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),"원"];
}
export default Category;