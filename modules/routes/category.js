var express = require('express')
var router = express.Router()
var {MainCategory, SubCategory} = require('../database/Schemas/category');
var {MainPayment, SubPayment} = require('../database/Schemas/payment');
router.post('/category/main', function(req,res){ //메인 카테고리 추가
    if(!req.user){
        return res.status(401).redirect('/')
    }
    var subId
    const newSubCategory = new SubCategory({
        userId : req.user,
        sub : req.body.sub
    })
    const newMainCategory = new MainCategory({
        userId : req.user,
        InAndOut : req.body.inandout,
        main : req.body.main,
        sub : subId
    })
    console.log("Main" + req.body.inandout)
    MainCategory.find({userId : req.user ,main : req.body.main})
    .then(result=>{
        if(!result || result.length === 0){
            newSubCategory.save()
            .then(result=>{
                newMainCategory.sub = result._id;
                console.log(newMainCategory)
                newMainCategory.save()
                .then(()=>{
                    console.log("추가성공")
                    return res.json({result : "Success"});
                })
                .catch(err=>{
                    console.log("추가실패")
                    console.log(err)
                    return res.json({result : "Fail"});
                })
            })
            .catch(err=>{
                console.log("추가실패")
                console.log(err)
                return res.json({result : "Fail"});
            })
        } else{
            console.log("이미존재")
            console.log(result)
            return res.json({result : "Fail"});
        }
    })
    .catch(err=>{
        console.log(err)
        return res.json({result : "Fail"});
    })
})

router.post('/category/sub', function(req,res){ //서브카테고리 추가
    if(!req.user){
        return res.status(401).redirect('/')
    }
    const newSubCategory = new SubCategory({
        userId : req.user,
        sub : req.body.sub
    })
    console.log(req.body.main_id)
    SubCategory.find({userId : req.user, sub : req.body.sub})
    .then(result=>{
        if(!result || result.length === 0){
            newSubCategory.save()
            .then(result=>{
                console.log("서브 추가 성공")
                MainCategory.find({userId : req.user, _id : req.body.main_id})
                .then(result2=>{
                    if(!result2 || result2.length === 0){
                        return res.json({result : "Fail"});
                    }else{
                        MainCategory.updateOne({userId : req.user, _id:req.body.main_id},{$push : {sub : result._id}})
                        .then(()=>{
                            console.log("메인 업데이트 성공")
                            return res.json({result : "Success"});
                        })
                        .catch(err=>{
                            console.log("메인 업데이트 실패")
                            console.log(err)
                            return res.json({result : "Fail"});
                        })
                    }
                })
                .catch(err=>{
                    console.log("메인 찾기 실패")
                    console.log(err)
                    return res.json({result : "Fail"});
                })
            })
            .catch(err=>{
                console.log("서브 추가 실패")
                console.log(err)
                return res.json({result : "Fail"});
            })
        }else{
            console.log("이미 존재함")
            return res.json({result : "Fail"});
        }
    })
    .catch(err=>{
        console.log("추가실패")
        console.log(err)
        return res.json({result : "Fail"});
    })
})
router.post('/category/remove', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
    SubCategory.deleteOne({userId : req.user, _id : req.body.sub_id})
    .then(()=>{
        console.log("서브 삭제 성공")
        MainCategory.updateOne({userId : req.user, _id : req.body.main_id},{$pull : {sub : req.body.sub_id}})
        .then(()=>{
            console.log("메인에서 해당 서브 삭제")
            MainCategory.find({userId : req.user, _id : req.body.main_id, sub : { $size: 0}})
            .then(result=>{
                console.log("result" + result)
                if(!result || result.length === 0){

                    console.log("메인에 서브 존재함")
                    return res.json({result : "Success"});
                }else{
                    MainCategory.deleteOne({userId : req.user, _id : req.body.main_id})
                    .then((result)=>{
                        console.log(result)
                        console.log("서브 없는 메인 삭제")
                        return res.json({result : "Success"});
                    })
                    .catch(err=>{
                        console.log("서브 없는 메인 삭제 실패")
                        console.log(err)
                        return res.json({result : "Fail"});
                    })
                }
            })
            .catch(err=>{
                console.log("메인 찾기 실패")
                console.log(err)
                return res.json({result : "Fail"});
            })
        })
        .catch(err=>{
            console.log("메인에서 해당 서브 삭제 실패")
            console.log(err)
            return res.json({result : "Fail"});
        })
    })
    .catch(err=>{
        console.log("서브 삭제 실패")
        console.log(err)
        return res.json({result : "Fail"});
    })
})
router.post('/payment/main', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
   

    newMainPayment = new MainPayment({
        userId : req.user,
        main : req.body.main,
    }) 
    newMainPayment.save()
    .then(()=>{
        console.log("성공")
        return res.json({result : "Success"});
    })
    .catch(err=>{
        console.log(err)
        console.log("실패")
        return res.json({result : "Fail"});
    })
})
router.post('/payment/sub', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
    newSubPayment = new SubPayment({
        userId : req.user,
        sub : req.body.sub,
        Balance : req.body.balance
    })
    SubPayment.find({userId : req.user, sub : req.body.sub})
    .then(result=>{
        if(!result || result.length === 0){
            newSubPayment.save()
            .then(result=>{
                console.log("서브 추가 성공")
                MainPayment.find({userId : req.user, _id : req.body.main_id})
                .then(result2=>{
                    if(!result2 || result2.length === 0){
                        return res.json({result : "Fail"});
                    }else{
                        MainPayment.updateOne({userId : req.user, _id:req.body.main_id},{$push : {sub : result._id}})
                        .then(()=>{
                            console.log("메인 업데이트 성공")
                            return res.json({result : "Success"});
                        })
                        .catch(err=>{
                            console.log("메인 업데이트 실패")
                            console.log(err)
                            return res.json({result : "Fail"});
                        })
                    }
                })
                .catch(err=>{
                    console.log("메인 찾기 실패")
                    console.log(err)
                    return res.json({result : "Fail"});
                })
            })
            .catch(err=>{
                console.log("서브 추가 실패")
                console.log(err)
                return res.json({result : "Fail"});
            })
        }else{
            console.log("서브가 이미 존재함")
            return res.json({result : "Fail"});
        }
    })
    .catch(err=>{
        console.log("서브 찾기 실패")
        console.log(err)
        return res.json({result : "Fail"});
    })
})
router.post('/payment/remove', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
    SubPayment.deleteOne({userId : req.user, _id : req.body.sub_id})
    .then(()=>{
        console.log("서브 삭제 성공")
        MainPayment.updateOne({userId : req.user, _id : req.body.main_id},{$pull : {sub : req.body.sub_id}})
        .then(()=>{
            console.log("메인에서 해당 서브 삭제")
            MainPayment.find({userId : req.user, _id : req.body.main_id, sub : { $size: 0}})
            .then(result=>{
                console.log("result" + result)
                if(!result || result.length === 0){

                    console.log("메인에 서브 존재함")
                    return res.json({result : "Success"});
                }else{
                    MainPayment.deleteOne({userId : req.user, _id : req.body.main_id})
                    .then((result)=>{
                        console.log(result)
                        console.log("서브 없는 메인 삭제")
                        return res.json({result : "Success"});
                    })
                    .catch(err=>{
                        console.log("서브 없는 메인 삭제 실패")
                        console.log(err)
                        return res.json({result : "Fail"});
                    })
                }
            })
            .catch(err=>{
                console.log("메인 찾기 실패")
                console.log(err)
                return res.json({result : "Fail"});
            })
        })
        .catch(err=>{
            console.log("메인에서 해당 서브 삭제 실패")
            console.log(err)
            return res.json({result : "Fail"});
        })
    })
    .catch(err=>{
        console.log("서브 삭제 실패")
        console.log(err)
        return res.json({result : "Fail"});
    })
})



module.exports = router;