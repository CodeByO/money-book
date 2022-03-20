var express = require('express')
var router = express.Router()
var mongo = require('../database/mongo');

// router.get('/out/category/:id', function(req,res){
//     var member_id = req.user;
//   
//     var main_id = req.params.id;
//    var UpListSql = "UPDATE list SET out_of_list = 1 where member_id=? && list_id=?";
//    var UpInbalSql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
//    var UpInDASql = "UPDATE day_amount SET member_in = member_in - ?, member_amount = member_amount - ? WHERE member_id=? && date=?"
//    var UpOutbalSql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
//    var UpOutDASql = "UPDATE day_amount SET member_out = member_out - ?, member_amount = member_amount + ? WHERE member_id=? && date=?"
//    var SelListSql = "SELECT inandout, list_id, price, list_date, payment FROM list WHERE out_of_list=0 && member_id=? && category_main=?"
//     maria.query(SelListSql,[member_id,main_id],function(err,rows){
//         if(rows == undefined || rows.length == 0)
//             {
//                 console.log("out of list2 err" + err);
//             }else{

//                 var SelListRows = rows;
//                 console.log(rows.length)
//                     for(var j = 0; j < SelListRows.length; j++){
//                         var price = SelListRows[j].price;
//                         var date = SelListRows[j].list_date;
//                         var inandout = SelListRows[j].inandout
//                         var list_id = SelListRows[j].list_id;
//                         var payment = SelListRows[j].payment;
//                         if(inandout == "수입"){
//                             maria.query(UpInbalSql,[parseInt(price),member_id,payment],function(err,rows){
//                                 if(err){
//                                     console.log(err);
//                                     maria.rollback();
//                                     res.status(404).redirect('/category');
//                                 } else{
//                                     maria.query(UpInDASql,[parseInt(price).parseInt(price),member_id,date],function(err,rows){
//                                         if(err){
//                                             console.log(err);
//                                             maria.rollback();
//                                             res.status(404).redirect('/category');
//                                         }
//                                     })
//                                 }

//                             }) 
//                              } else if(inandout == "지출"){
            
//                             maria.query(UpOutbalSql,[parseInt(price),member_id,payment],function(err,rows){
//                                 if(err){
//                                     console.log(err);
//                                     maria.rollback();
//                                     res.status(404).redirect('/category');
//                                 } else{
//                                     maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
//                                         if(err){
//                                             console.log(err);
//                                             maria.rollback();
//                                             res.status(404).redirect('/category');
//                                         }
//                                     })
//                                 }

//                             })
//                              }
//                         maria.query(UpListSql,[member_id,list_id], function(err,rows,next){
//                             if(rows === undefined || rows.length == 0)
//                             {
//                                 console.log("out of list3 err" + err);
//                             }else{

//                             }

//                         })
//                     }
//                 }
                
                
//             })
       
//             res.json({result : "Success"});
            

// })

// router.get('/in/category/:id', function(req,res){
//     var member_id = req.user;
//    
//     var main_id = req.params.id;
//    var UpListSql = "UPDATE list SET out_of_list = 0 where member_id=? && list_id=?";
//    var UpInbalSql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
//    var UpInDASql = "UPDATE day_amount SET member_in = member_in + ?, member_amount = member_amount + ? WHERE member_id=? && date=?"
//    var UpOutbalSql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
//    var UpOutDASql = "UPDATE day_amount SET member_out = member_out + ?, member_amount = member_amount - ? WHERE member_id=? && date=?"
//    var SelListSql = "SELECT inandout, list_id, price, list_date, payment FROM list WHERE out_of_list=1 && member_id=? && category_main=?"
//     maria.query(SelListSql,[member_id,main_id],function(err,rows){
//         if(rows == undefined || rows.length == 0)
//             {
//                 console.log("out of list2 err" + err);
//             }else{

//                 var SelListRows = rows;
//                 console.log(rows.length)
//                     for(var j = 0; j < SelListRows.length; j++){
//                         var price = SelListRows[j].price;
//                         var date = SelListRows[j].list_date;
//                         var inandout = SelListRows[j].inandout
//                         var list_id = SelListRows[j].list_id;
//                         var payment = SelListRows[j].payment;
//                         if(inandout == "수입"){
//                             maria.query(UpInbalSql,[parseInt(price),member_id,payment],function(err,rows){
//                                 if(err){
//                                     console.log(err);
//                                     maria.rollback();
//                                     res.status(404).redirect('/category');
//                                 } else{
//                                     maria.query(UpInDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
//                                         if(err){
//                                             console.log(err);
//                                             maria.rollback();
//                                             res.status(404).redirect('/category');
//                                         }
//                                     })
//                                 }

//                             }) 
//                              } else if(inandout == "지출"){
            
//                             maria.query(UpOutbalSql,[parseInt(price),member_id,payment],function(err,rows){
//                                 if(err){
//                                     console.log(err);
//                                     maria.rollback();
//                                     res.status(404).redirect('/category');
//                                 } else{
//                                     maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
//                                         if(err){
//                                             console.log(err);
//                                             maria.rollback();
//                                             res.status(404).redirect('/category');
//                                         }
//                                     })
//                                 }

//                             })
//                              }
//                         maria.query(UpListSql,[member_id,list_id], function(err,rows,next){
//                             if(rows === undefined || rows.length == 0)
//                             {
//                                 console.log("out of list3 err" + err);
//                             }else{

//                             }

//                         })
//                     }
//                 }
                
                
//             })
       
//             res.json({result : "Success"});
            

// })


router.get('/out/category/sub/:id', function(req,res,next){
    var member_id = req.user;
   
    var sub_id = req.params.id;
   var UpListSql = "UPDATE list SET out_of_list = 1 where member_id=? && list_id=?";
   var UpInbalSql = "UPDATE payment_sub SET  balance = balance - ? WHERE member_id=? && id=?";
   var UpInDASql = "UPDATE day_amount SET member_in = member_in - ?, member_amount = member_amount - ? WHERE member_id=? && date=?"
   var UpOutbalSql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
   var UpOutDASql = "UPDATE day_amount SET member_out = member_out - ?, member_amount = member_amount + ? WHERE member_id=? && date=?"    
    var SelListSql = "SELECT inandout, list_id, price, list_date, payment FROM list WHERE out_of_list=0 && member_id=? && category_sub=?"
    var UpSubCaSql = "UPDATE category_sub SET out_of_list=1 where member_id=? && id=?"
    maria.query(SelListSql,[member_id,sub_id],function(err,rows){
        if(rows == undefined || rows.length == 0)
        {
            console.log("out of list2 err" + err);
           }else{
            var SelListRows = rows;
            for(var j = 0; j < SelListRows.length; j++){
                var price = SelListRows[j].price;
                var date = SelListRows[j].list_date;
                var inandout = SelListRows[j].inandout
                var list_id = SelListRows[j].list_id;
                var payment = SelListRows[j].payment
                if(inandout == "수입"){
                    maria.query(UpInbalSql,[parseInt(price),member_id,payment],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                            } else{
                             maria.query(UpInDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                } else{
                                    maria.query(UpSubCaSql,[member_id,sub_id],function(err,row){

                                    })
                                }
                            })
                        }

                    }) 
                    } else if(inandout == "지출"){
                    
                        maria.query(UpOutbalSql,[parseInt(price),member_id,payment],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                        } else{
                            maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    })
                }
                maria.query(UpListSql,[member_id,list_id], function(err,rows,next){
                    if(rows === undefined || rows.length == 0)
                    {
                        console.log("out of list3 err" + err);
                    }
                        })
                maria.query(UpSubCaSql,[member_id,sub_id],function(err,row){
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"});
                            }
                        })
                    }
                }
                
                
            })
            res.json({result : "Success"});
})

router.get('/in/category/sub/:id', function(req,res){
    var member_id = req.user;
    var sub_id = req.params.id;
   var UpListSql = "UPDATE list SET out_of_list = 0 where member_id=? && list_id=?";
   var UpInbalSql = "UPDATE payment_sub SET out_of_list=0,balance = balance + ? WHERE member_id=? && id=?";
   var UpInDASql = "UPDATE day_amount SET member_in = member_in + ?, member_amount = member_amount + ? WHERE member_id=? && date=?"
   var UpOutbalSql = "UPDATE payment_sub SET out_of_list=0, balance = balance - ? WHERE member_id=? && id=?";
   var UpOutDASql = "UPDATE day_amount SET member_out = member_out + ?, member_amount = member_amount - ? WHERE member_id=? && date=?"    
    var SelListSql = "SELECT inandout, list_id, price, list_date, payment FROM list WHERE out_of_list=1 && member_id=? && category_sub=?"
    var UpSubCaSql = "UPDATE category_sub SET out_of_list=0 where member_id=? && id=?"
    maria.query(SelListSql,[member_id,sub_id],function(err,rows){
        if(rows == undefined || rows.length == 0)
        {
            console.log("out of list2 err" + err);
           }else{
            var SelListRows = rows;
            for(var j = 0; j < SelListRows.length; j++){
                var price = SelListRows[j].price;
                var date = SelListRows[j].list_date;
                var inandout = SelListRows[j].inandout
                var list_id = SelListRows[j].list_id;
                var payment = SelListRows[j].payment
                if(inandout == "수입"){
                    maria.query(UpInbalSql,[parseInt(price),member_id,payment],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                            } else{
                             maria.query(UpInDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    }) 
                    } else if(inandout == "지출"){
                    
                        maria.query(UpOutbalSql,[parseInt(price),member_id,payment],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                        } else{
                            maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    })
                }
                maria.query(UpListSql,[member_id,list_id], function(err,rows,next){
                    if(rows === undefined || rows.length == 0)
                    {
                        console.log("out of list3 err" + err);
                    }
                        })
                 maria.query(UpSubCaSql,[member_id,sub_id],function(err,row){
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"});
                            }
                                })       
                    }
                }
                
                
            })
            res.json({result : "Success"});
})
router.get('/out/payment/:id', function(req,res){
    var member_id = req.user;
    var pay_id = req.params.id;
   var UpListSql = "UPDATE list SET out_of_list = 1 where member_id=? && list_id=?";
   var UpInbalSql = "UPDATE payment_sub SET out_of_list=1, balance = balance - ? WHERE member_id=? && id=?";
   var UpInDASql = "UPDATE day_amount SET member_in = member_in - ?, member_amount = member_amount - ? WHERE member_id=? && date=?"
   var UpOutbalSql = "UPDATE payment_sub SET out_of_list=1, balance = balance + ? WHERE member_id=? && id=?";
   var UpOutDASql = "UPDATE day_amount SET member_out = member_out - ?, member_amount = member_amount + ? WHERE member_id=? && date=?"    
    var SelListSql = "SELECT inandout, list_id, price, list_date FROM list WHERE out_of_list=0 && member_id=? && payment=?"
    maria.query(SelListSql,[member_id,pay_id],function(err,rows){
        if(rows == undefined || rows.length == 0)
        {
            console.log("out of list2 err" + err);
           }else{
            var SelListRows = rows;
            for(var j = 0; j < SelListRows.length; j++){
                var price = SelListRows[j].price;
                var date = SelListRows[j].list_date;
                var inandout = SelListRows[j].inandout
                var list_id = SelListRows[j].list_id;
                if(inandout == "수입"){
                    maria.query(UpInbalSql,[parseInt(price),member_id,pay_id],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                            } else{
                             maria.query(UpInDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    }) 
                    } else if(inandout == "지출"){
                    
                        maria.query(UpOutbalSql,[parseInt(price),member_id,pay_id],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                        } else{
                            maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    })
                }
                maria.query(UpListSql,[member_id,list_id], function(err,rows){
                    if(rows === undefined || rows.length == 0)
                    {
                        console.log("out of list3 err" + err);
                    }else{
                           
                    }
                        })
                    }
                }
                
                
            })
            res.json({result : "Success"});
       
})
router.get('/in/payment/:id', function(req,res,next){
    var member_id = req.user;
    var pay_id = req.params.id;
   var UpListSql = "UPDATE list SET out_of_list = 0 where member_id=? && list_id=?";
   var UpInbalSql = "UPDATE payment_sub SET out_of_list = 0, balance = balance + ? WHERE member_id=? && id=?";
   var UpInDASql = "UPDATE day_amount SET member_in = member_in + ?, member_amount = member_amount + ? WHERE member_id=? && date=?"
   var UpOutbalSql = "UPDATE payment_sub SET out_of_list = 0, balance = balance - ? WHERE member_id=? && id=?";
   var UpOutDASql = "UPDATE day_amount SET member_out = member_out + ?, member_amount = member_amount - ? WHERE member_id=? && date=?"    
    var SelListSql = "SELECT inandout, list_id, price, list_date FROM list WHERE out_of_list=1 && member_id=? && payment=?"
    maria.query(SelListSql,[member_id,pay_id],function(err,rows){
        if(rows == undefined || rows.length == 0)
        {
            console.log("out of list2 err" + err);

           }else{
            var SelListRows = rows;
            for(var j = 0; j < SelListRows.length; j++){
                var price = SelListRows[j].price;
                var date = SelListRows[j].list_date;
                var inandout = SelListRows[j].inandout
                var list_id = SelListRows[j].list_id;
                if(inandout == "수입"){
                    maria.query(UpInbalSql,[parseInt(price),member_id,pay_id],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                            } else{
                             maria.query(UpInDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    }) 
                    } else if(inandout == "지출"){
                    
                        maria.query(UpOutbalSql,[parseInt(price),member_id,pay_id],function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"});
                        } else{
                            maria.query(UpOutDASql,[parseInt(price),parseInt(price),member_id,date],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"});
                                }
                            })
                        }

                    })
                }
                maria.query(UpListSql,[member_id,list_id], function(err,rows){
                    if(rows === undefined || rows.length == 0)
                    {
                        console.log("out of list3 err" + err);
                    }else{
                           
                    }
                        })
                    }
                }
                
                
            })
            res.json({result : "Success"});
       
})

module.exports = router;