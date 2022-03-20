
import React,{useEffect,useState}from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {Form} from 'react-bootstrap'
import { unstable_batchedUpdates } from "react-dom";


function PostSubCategory(props){
    let history = useHistory()
  const [inputs,setInputs] = useState({
    inandout : '',
});

const {inandout} = inputs;
const onChange = (e) =>{
    const {value, name} = e.target;
    setInputs({
        ...inputs,
        [name] : value
    });
    
};

let [MainCategory,setMainCategory] = useState();
let [CatInLength,setCatInLength] = useState();
let [CatOutLength,setCatOutLength] = useState();

useEffect(()=>{
    console.log('첫 렌더');
    let isComponentMounted = true;
    const fetchData = async ()=>{
      const urls = [
        `/api/category`,
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
              setMainCategory(cur.data.Data);
              console.log(cur.data.Data)

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
useEffect(()=>{
    setCatInLength(MainCategory&&MainCategory.filter(v=>v.InAndOut == "수입"))
    setCatOutLength(MainCategory&&MainCategory.filter(v=>v.InAndOut == "지출"))
},[MainCategory])


    return (
        <div className='auth-wraaper'>
             <div className="auth-inner">
               <h3>새로운 세부 카테고리</h3>
               <form onSubmit={(e)=>{
                e.preventDefault();
                let userInputData = {
                    inandout : e.target.inandout.value,
                    main : e.target.main.value,
                    sub : e.target.sub.value,
                };
                axios({
                    method : 'POST',
                    url : '/category/sub',
                    data : {inandout:userInputData.inandout,main_id:userInputData.main,sub:userInputData.sub},
                }).then((result)=>{if(result.data.result=='Success'){
                    history.push('/category')
    
                }})
            }}>
             <Form.Group>
                    <Form.Label>수입/지출</Form.Label>
                    <Form.Control onChange={onChange} as="select" name="inandout">
                    <option defaultValue="1">선택</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicCategoryMain">
                     <Form.Label>메인 카테고리</Form.Label>
                         <Form.Control  as="select" name="main">
                              <option defaultValue="-1">선택</option>
                                {
                                inandout == "수입"
                                ?CatInLength&&CatInLength.map((data,index)=>{
                                     return(
                                         <option value={data._id} key={data._id}>
                                             {data.main}
                                         </option>
                                        )
                                 })
                                :inandout == "지출"
                                ?CatOutLength&&CatOutLength.map((data,index)=>{
                                    return(
                                        <option value={data._id} key={data._id}>
                                            {data.main}
                                         </option>
                                      )
                                 })
                                :null
                                }
                            </Form.Control>
                    </Form.Group>

                    <Form.Group >
                <Form.Label>서브 카테고리</Form.Label>
                    <Form.Control type="text" defaultValue="기타" name="sub"/>
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

export default PostSubCategory;