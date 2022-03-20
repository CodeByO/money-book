import React, {useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';



import './design.css';

function Jumbotron(props)
{
  var now = new Date();
  let [Month,setMonth] = useState(("00" + (now.getMonth() + 1)).slice(-2));
  let [Year,setYear] = useState(now.getFullYear());
  let [UserDate, setUserDate] = useState(Year+"-"+Month);
  useEffect(()=>{
    if(props.Month == 13){
      setYear(Year+1);
      setMonth(("00" + (Month - 12)).slice(-2));
      setUserDate(Year+"-"+Month);
      props.setYear(Year+1);
      props.setMonth(("00" + (Month - 12)).slice(-2));
      props.setUserDate(Year+"-"+Month);
    }
    if(Month == 0){
      setYear(Year-1);
      setMonth(("00" + (Month + 12)).slice(-2));
      setUserDate(Year+"-"+Month);
    }
    props.setUserDate(UserDate);
  },[UserDate])
  
  
  
    let monthIn = 0;
    let monthOut = 0;
    let monthAmount = 0;
    if(props.data != undefined){
      for(let i =0; i<props.data.length; i++){
        monthIn = monthIn + props.data[i].member_in;
        monthOut = monthOut + props.data[i].member_out;
        monthAmount = monthAmount + props.data[i].member_amount;
      }
    }
    return (
        
        <header className="jumbotron">


        <div className="container">
          <div className='row'>
          <div className="select-date">
          <h3>{props.Year}년 {props.Month}월</h3>
          </div>
          </div>
          <div className="row">
            <div className="col">

              <div className="col-md-4">
               수입: <span className="font-weight-bold income">{priceToString(monthIn)}</span>
              </div>
              <div className="col-md-4">
               지출: <span className="font-weight-bold outcome">{priceToString(monthOut)}</span>
              </div>
              <div className="col-md-4">
               총합: <span className="font-weight-bold outcome">{priceToString(monthAmount)}</span>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
            <Button onClick={()=>{props.setMonth(("00" + (parseInt(Month) - 1)).slice(-2));
            props.setUserDate(Year+"-"+Month);setMonth(("00" + (parseInt(Month) - 1)).slice(-2));
            setUserDate(Year+"-"+Month);}}>이전</Button>
      <Button onClick={()=>{props.setMonth(("00" + (parseInt(Month) + 1)).slice(-2));
            props.setUserDate(Year+"-"+Month);setMonth(("00" + (parseInt(Month) + 1)).slice(-2));
            setUserDate(Year+"-"+Month);}}>다음</Button>
            </div>
            <div className="col-md-4">
              
            </div>
          </div>
        </div>
      </header>

    );

}
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export default Jumbotron;