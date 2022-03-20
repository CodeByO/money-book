var express = require('express')
var router = express.Router()
const Amount = require('../database/Schemas/amount')

router.get('/api/DayAmount/:date',function(req,res){ //jumbotron에 띄울 데이터
    if(!req.user){
        return res.status(401).redirect('/')
    }
    Amount.find({userId : req.user, Data : { $regex : '.*'+ req.params.date + '.*' } })
        .then(result=>{
            if(!result){
                return res.status(404).json({Result : "Fail"});
            } else{
                return res.status(200).json({Data : result});
            }
        })
        .catch(err=>{
            console.log(err)
            return res.status(404).json({Result : "Fail"});
        })
})


module.exports = router;