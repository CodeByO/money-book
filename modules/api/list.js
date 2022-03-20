var express = require('express')
var router = express.Router()
const List = require('../database/Schemas/list');

router.get('/api/list/:date', function(req,res){ //기본적인 날짜 기반의 내역
    if(!req.user){
        return res.status(401).redirect('/')
    }
    List.find({userId : req.user, listDate : { $regex : '.*'+ req.params.date + '.*' }})
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