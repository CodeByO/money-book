var express = require('express')
var router = express.Router()
const {MainPayment} = require('../database/Schemas/payment')

router.get('/api/payment', function(req,res){ 
    if(!req.user){
        return res.status(401).redirect('/')
    }//내역 입력할 때 결제 방식 선택을 위한 데이터
    MainPayment.find({userId : req.user}).populate('sub')
        .then(result=>{
            if(!result){
                return res.status(404).json({Result : "Fail"});
            }else{
                return res.status(200).json({Data :result});
            }
        })
        .catch(err=>{
            console.log(err)
            return res.status(404).json({Result : "Fail"});
        })
})




module.exports = router;
