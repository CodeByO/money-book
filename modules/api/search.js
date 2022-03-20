var express = require('express')
var router = express.Router()
var mongo = require('../database/mongo');


router.post('/api/search', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
    var SearchObj = {};
    SearchObj.member_id = req.user;
    SearchObj.inandout = req.body.userInputData.inandout;
    SearchObj.contents = req.body.userInputData.contents;
    SearchObj.payment =  req.body.userInputData.payment;
    SearchObj.category_main =  req.body.userInputData.category_main;
    SearchObj.category_sub = req.body.userInputData.category_sub;
    SearchObj.date_min =  req.body.userInputData.date_min;
    SearchObj.date_max =  req.body.userInputData.date_max;
    SearchObj.price_min =  req.body.userInputData.price_min;
    SearchObj.price_max =  req.body.userInputData.price_max;
    console.log(req.body);
    console.log(SearchObj)
    var SearchSql = "SELECT * FROM list WHERE member_id=? && inandout=? ";
    if(SearchObj.contents == '-1'){
        delete SearchObj.contents;
        
    } else{
        var Search = "%" +SearchObj.contents+"%";
        SearchObj.contents = Search;
        var ConSql = " && contents LIKE ?" ;
        SearchSql = SearchSql + ConSql;
    }
    if(SearchObj.payment == '-1' ){
        delete SearchObj.payment;
        
    } else{
        var PaySql = "&& payment=? ";
        SearchSql = SearchSql + PaySql;
    }
    if(SearchObj.category_main == '-1' ){
        delete SearchObj.category_main;
        
    } else{
        var CatSql = "&& category_main=? ";
        SearchSql = SearchSql + CatSql;
    }
    if(SearchObj.category_sub == '-1' ){
        delete SearchObj.category_sub;
        
    } else{
        var CatSql = "&& category_sub=? ";
        SearchSql = SearchSql + CatSql;
    }
    if(SearchObj.date_min == '-1' ){
        delete SearchObj.date_min;
        
    } else{
        var DMinSql = "&& ?<=list_date ";
        SearchSql = SearchSql + DMinSql;
    }
    if(SearchObj.date_max == '-1'){
        delete SearchObj.date_max;
        
    } else{
        var DMaxSql = "&& list_date<=? ";
        SearchSql = SearchSql + DMaxSql;
    }
    if(SearchObj.price_min == '-1'){
        delete SearchObj.price_min;
        
    } else{
        var PrMinSql = "&& ?<=price ";
        SearchSql = SearchSql + PrMinSql
    }
    if(SearchObj.price_max == '-1'){
        delete SearchObj.price_max;
        
    }else{
        var PrMaxSql = "&& price <=? ";
        SearchSql = SearchSql + PrMaxSql;
    }
    console.log(SearchSql);
   
    var arg = [];
    arg = Object.values(SearchObj);
    maria.query(SearchSql,arg,function(err,rows){
        if(err || rows === undefined || rows.length === 0){
            console.log("Fail");
            return res.status(200).json({Result : "Fail"});
        } else{
            console.log("Success");
            console.log(rows);
            return res.status(200).json({Data : rows,Result : "Success"});
        }
    })
    
})

module.exports = router;