var express = require('express')
var router = express.Router()
const {MainCategory} = require('../database/Schemas/category')


router.get('/api/category', function(req,res){ //메인 카테고리 데이터
    if(!req.user){
        return res.status(401).redirect('/')
    }
    MainCategory.find({userId : req.user}).populate('sub')
        .then(result=>{
            if(!result){
                return res.status(404).json({Result : "Fail"});
            }else{
                return res.status(200).json({Data : result});
            }
        })
        .catch(err=>{
            console.log(err)
            return res.status(404).json({Result : "Fail"});
        })
})



module.exports = router;
