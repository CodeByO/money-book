var express = require('express')
var router = express.Router()
var mongo = require('../database/mongo')

router.post('/post/list', function(req,res,next){ 
    if(!req.user){
        return res.status(401).redirect('/')
    }
    var PostObj = req.body.userInputData; 
    console.log(PostObj);
    var member_id  = req.user;
    var date = PostObj.list_date;
    var price = PostObj.price;
    var payment = PostObj.payment;
    PostObj.member_id = member_id;
    var InListSql = "INSERT INTO list SET ?;";
    if(PostObj.list_id === 'new') //만약 내역이 새로운거라면
    {   delete PostObj.list_id;
        if(PostObj.inandout == "이체"){
            console.log("이체 검색")
            PostObj.out_of_list = 1;
            var SrcPay = PostObj.payment;
            var DstPay = PostObj.payment_dst;
            var InMoSql = "INSERT INTO list SET ?"
            maria.query(InMoSql,PostObj,function(err,rows){
                if(!err){
                    var UpSrcpay = "UPDATE payment_sub SET balance = balance - ? WHERE id=? && member_id=?";
                    maria.query(UpSrcpay,[parseInt(price),SrcPay,member_id],function(err,rows){
                        if(!err){
                            var UpDstpay = "UPDATE payment_sub SET balance = balance + ? WHERE id=? &&  member_id=?";
                            maria.query(UpDstpay,[parseInt(price),DstPay,member_id],function(err,rows){
                                if(err){
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"})
                                }
                            })
                        } else{
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }
                    })
                } else{
                    console.log(err);
                    maria.rollback();
                    res.json({result : "Fail"})
                }
            })
            console.log("이체성공")
            res.json({result : "Success"})
        }
        //이체가 아닐시
        maria.query(InListSql,PostObj, function(err,rows){
            if(!err){
                if(PostObj.out_of_list == 0){
                    UpdateOtherTable(PostObj,req,res)
                }
                   
            
            } else{
                console.log(err);
                maria.rollback();
                res.json({result : "Fail"})
            }
        })
        console.log("추가 수행 끝")
        
    } else{ //기존에 있는걸 수정하려면 삭제하고 그 list_id로 다시 INSERT한다.
        console.log("기존꺼 변경")
        var list_id = PostObj.list_id;
        var SelExSql = "SELECT inandout, price,out_of_list FROM list where list_id=? && member_id=?";
        var DelExSql = "DELETE from list where list_id=? && member_id=?";
        maria.query(SelExSql,[list_id,member_id],function(err,rows){
            console.log(rows[0])
            var inandout = rows[0].inandout;
            var out_of_list = PostObj.out_of_list;
            var Exout_of_list = rows[0].out_of_list;
            var ExPrice = rows[0].price;
            maria.query(DelExSql,[list_id,member_id],function(err,rows){
                console.log("삭제 실행")
                if(inandout == "이체"){
                    console.log("이체 검색")
                    var SrcPay = PostObj.payment;
                    var DstPay = PostObj.payment_dst;
                    PostObj.out_of_list = 1;
                    var InMoSql = "INSERT INTO list SET ?"
                    maria.query(InMoSql,PostObj,function(err,rows){
                        if(!err){
                            console.log("자산 업데이트")
                            var UpSrcpay = "UPDATE payment_sub SET balance = balance - ? WHERE id=? && member_id=?";
                            maria.query(UpSrcpay,[parseInt(ExPrice),DstPay,member_id],function(err,rows){
                                if(!err){
                                    var UpDstpay = "UPDATE payment_sub SET balance = balance + ? WHERE id=? &&  member_id=?";
                                    maria.query(UpDstpay,[parseInt(ExPrice),SrcPay,member_id],function(err,rows){
                                        if(err){
                                            console.log(err);
                                            maria.rollback();
                                            res.json({result : "Fail"})
                                        }
                                    })
                                } else{
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"})
                                }
                            }) 
                            console.log("자산 업데이트 끝")
                            if(PostObj.out_of_list == 0){
                                UpdateOtherTable(PostObj,req,res)
                            }
                        } else{
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }
                    })
                    
                }
                if(inandout == "수입"){
                    if(out_of_list == 0 && Exout_of_list == 0){ //0->0으로의 진행
                        console.log("수입  변경 내역 반영(0,0)")
                        var UPExPaySql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
                        maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                            if(!err){
                                var UPExDayASql = "UPDATE day_amount SET member_in=member_in-?, member_amount=member_amount-? where member_id=? && date=? ";
                                maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                                    if(!err){
                                        var InListSql = "INSERT INTO list SET ?;";
                                        maria.query(InListSql,PostObj, function(err,rows){
                                            if(!err){
                                                //day_amount 테이블에 방금 등록한 정보가 있는지 확인하고 있으면 UPDATE
                                                // 없으면 INSERT한다   
                                                
                                                    UpdateOtherTable(PostObj,req,res);
                                                
    
                                            } else{
                                                console.log(err);
                                                maria.rollback();
                                                res.json({result : "Fail"})
                                            }
                                        })
                                    }else{
                                        console.log(err);
                                        maria.rollback();
                                        res.json({result : "Fail"})
                                    }
                                })
                            }
                            else{
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }
                        }) 
                    }else if(Exout_of_list==0 && out_of_list==1){
                        console.log("수입  변경 내역 반영(0,1)")
                        var UPExPaySql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
                        maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                            if(!err){
                                var UPExDayASql = "UPDATE day_amount SET member_in=member_in-?, member_amount=member_amount-? where member_id=? && date=? ";
                                maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                                    if(!err){
                                        var InListSql = "INSERT INTO list SET ?;";
                                        maria.query(InListSql,PostObj, function(err,rows){
                                            if(!err){
                                                //day_amount 테이블에 방금 등록한 정보가 있는지 확인하고 있으면 UPDATE
                                                // 없으면 INSERT한다   
                                                
                                                    res.json({result : 'Success'})
                                                
    
                                            } else{
                                                console.log(err);
                                                maria.rollback();
                                                res.json({result : "Fail"})
                                            }
                                        })
                                    }else{
                                        console.log(err);
                                        maria.rollback();
                                        res.json({result : "Fail"})
                                    }
                                })
                            }
                            else{
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }
                        }) 
                    } else if(Exout_of_list==1 && out_of_list==0){

                        var InListSql = "INSERT INTO list SET ?;";
                        maria.query(InListSql,PostObj, function(err,rows){
                            if(err){
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }else{
                                UpdateOtherTable(PostObj,req,res);
                            }
                        })
                       


                    }else if(out_of_list==1 && Exout_of_list==1){

                        var InListSql = "INSERT INTO list SET ?;";
                        maria.query(InListSql,PostObj, function(err,rows){
                            if(err){
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }else{
                                res.json({result : "Success"})
                            }
                        })


                    }
                }
                if(inandout == "지출"){
                   if(out_of_list==0 && Exout_of_list==0){ //0->0으로의 진행
                    console.log("지출 선택")
                    var UPExPaySql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
                    maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                        if(!err){
                            var UPExDayASql = "UPDATE day_amount SET member_out=member_out-?, member_amount=member_amount+? where member_id=? && date=? ";
                            maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                                if(!err){
                                    var InListSql = "INSERT INTO list SET ?;";
                                    maria.query(InListSql,PostObj, function(err,rows){
                                        if(!err){
                                           //day_amount 테이블에 방금 등록한 정보가 있는지 확인하고 있으면 UPDATE
                                            // 없으면 INSERT한다.
                                    
                                                UpdateOtherTable(PostObj,req,res);
                                            
                                     
                                        } else{
                                            console.log(err);
                                            maria.rollback();
                                            res.json({result : "Fail"})
                                        }
                                    })
                                }else{
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"})
                                }
                            })
                        }
                        else{
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }
                    })
                   }else if(Exout_of_list==0 && out_of_list==1 ){ //0->1로의 진행
                    console.log("지출  변경 내역 반영(0,1)")
                    var UPExPaySql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
                    maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                        if(!err){
                            var UPExDayASql = "UPDATE day_amount SET member_out=member_out-?, member_amount=member_amount+? where member_id=? && date=? ";
                            maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                                if(!err){
                                    var InListSql = "INSERT INTO list SET ?;";
                                    maria.query(InListSql,PostObj, function(err,rows){
                                        if(!err){
                                            //day_amount 테이블에 방금 등록한 정보가 있는지 확인하고 있으면 UPDATE
                                            // 없으면 INSERT한다   
                                            
                                                res.json({result : 'Success'})
                                            

                                        } else{
                                            console.log(err);
                                            maria.rollback();
                                            res.json({result : "Fail"})
                                        }
                                    })
                                }else{
                                    console.log(err);
                                    maria.rollback();
                                    res.json({result : "Fail"})
                                }
                            })
                        }
                        else{
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }
                    })
                   } else if(Exout_of_list==1 && out_of_list==0){ //1->0로의 진행

                    var InListSql = "INSERT INTO list SET ?;";
                    maria.query(InListSql,PostObj, function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }else{
                            UpdateOtherTable(PostObj,req,res);
                        }
                    })
                   
                   }else if(Exout_of_list==1 && out_of_list==1 ){//1->1로의 진행

                    var InListSql = "INSERT INTO list SET ?;";
                    maria.query(InListSql,PostObj, function(err,rows){
                        if(err){
                            console.log(err);
                            maria.rollback();
                            res.json({result : "Fail"})
                        }else{
                            res.json({result : "Success"})
                        }
                    })
                   }                 
                }
            })
            
        })
    }
});

function UpdateOtherTable(PostObj,req,res){
    var member_id = req.user;
    var date = req.body.userInputData.list_date;
    var price = req.body.userInputData.price;
    var payment = req.body.userInputData.payment
    if(PostObj.inandout == "수입"){
        console.log("list/in 업데이트" + price)
        var SelDaSql = "SELECT * from day_amount where member_id=? && date=?";
        maria.query(SelDaSql,[member_id,date], function(err,rows){
            var IDayObj = {
                member_id : member_id,
                date : date,
                member_in : price,
                member_amount : price,   
            }
            
            if(rows.length === 0 || rows == undefined){
                var InDaSql = "INSERT INTO day_amount SET ?"
                maria.query(InDaSql,IDayObj,function(err,rows){
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                });
            } else {
                
                var UpDaSql = 'UPDATE day_amount SET member_in=member_in+?, member_amount=member_amount+? where member_id=? && date=?';
                maria.query(UpDaSql,[parseInt(price),parseInt(price),member_id,date], function(err,rows){
                    console.log("list/in 합산 업데이트" + price)
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                    
                });
                
                var UpPaSql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
                maria.query(UpPaSql,[price,member_id,payment],function(err,rows){
                    console.log("list/in 결제수단 업데이트" + price)
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.status(404);
                    }
                })
            }
            console.log("수입 기록 끝")
            res.json({result : "Success"})
        });
        

    } else if (PostObj.inandout == "지출"){
        console.log("지출 기록")
        var SelDaSql = "SELECT * from day_amount where member_id=? && date=?";
        maria.query(SelDaSql,[member_id,date], function(err,rows){
            var DayObj = {
                member_id : member_id,
                date : date,
                member_in : price,
                member_amount : -price,   
            }
            
            if(rows.length === 0 || rows == undefined){
                console.log("지출 합산 업데이트")
                var InDaSql = "INSERT INTO day_amount SET ?"
                maria.query(InDaSql,DayObj,function(err,rows){
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                });
            } else {
                console.log("list/out 1번째" + price)
                var UpDaSql = 'UPDATE day_amount SET member_out=member_out+?, member_amount=member_amount-? where member_id=? && date=?';
                maria.query(UpDaSql,[parseInt(price),parseInt(price),member_id,date], function(err,rows){
                    if(!err){
                        console.log(rows)

                    }
                    
                });
                console.log("지출 수단 업데이트")
                var UpPaSql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
                maria.query(UpPaSql,[price,member_id,payment],function(err,rows){
                    if(err){
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                })
            }
        });
        res.json({result : "Success"}) 
    }
}
// function UpdateOtherTableRepeat(PostObj,req,res,next){
//     var member_id = req.user;
//     var date = req.body.userInputData.list_date;
//     var price = req.body.userInputData.price;
//     var payment = req.body.userInputData.payment
//     if(PostObj.inandout == "수입"){
//         console.log("list/in 업데이트" + price)
//         var SelDaSql = "SELECT * from day_amount where member_id=? && date=?";
//         maria.query(SelDaSql,[member_id,date], function(err,rows){
//             var IDayObj = {
//                 member_id : member_id,
//                 date : date,
//                 member_in : price,
//                 member_amount : price,   
//             }
            
//             if(rows.length === 0 || rows == undefined){
//                 var InDaSql = "INSERT INTO day_amount SET ?"
//                 maria.query(InDaSql,IDayObj,function(err,rows){
//                     if(err){
//                         console.log(err);
//                         maria.rollback();
//                         res.json({result : "Fail"})
//                     }
//                 });
//             } else {
//                 console.log("list/in 합산 업데이트" + price)
//                 var UpDaSql = 'UPDATE day_amount SET member_in=member_in+?, member_amount=member_amount+? where member_id=? && date=?';
//                 maria.query(UpDaSql,[parseInt(price),parseInt(price),member_id,date], function(err,rows){
//                     if(err){
//                         console.log(err);
//                         maria.rollback();
//                         res.json({result : "Fail"})
//                     }
                    
//                 });
//                 console.log("list/in 결제수단 업데이트" + price)
//                 var UpPaSql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
//                 maria.query(UpPaSql,[price,member_id,payment],function(err,rows){
//                     if(err){
//                         console.log(err);
//                         maria.rollback();
//                         res.status(404);
//                     }
//                 })
//             }
//             console.log("수입 기록 끝")
//             next()
//         });
        

//     } else if (PostObj.inandout == "지출"){
//         console.log("지출 기록")
//         var SelDaSql = "SELECT * from day_amount where member_id=? && date=?";
//         maria.query(SelDaSql,[member_id,date], function(err,rows){
//             var DayObj = {
//                 member_id : member_id,
//                 date : date,
//                 member_out : price,
//                 member_amount : -price,   
//             }
            
//             if(rows.length === 0 || rows == undefined){
//                 console.log("지출 합산 업데이트")
//                 var InDaSql = "INSERT INTO day_amount SET ?"
//                 maria.query(InDaSql,DayObj,function(err,rows){
//                     if(err){
//                         console.log(err);
//                         maria.rollback();
//                         res.json({result : "Fail"})
//                     }
//                 });
//             } else {
//                 console.log("list/out 1번째" + price)
//                 var UpDaSql = 'UPDATE day_amount SET member_out=member_out+?, member_amount=member_amount-? where member_id=? && date=?';
//                 maria.query(UpDaSql,[parseInt(price),parseInt(price),member_id,date], function(err,rows){
//                     if(!err){
//                         console.log("지출 수단 업데이트")
//                         var UpPaSql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
//                         maria.query(UpPaSql,[price,member_id,payment],function(err,rows){
//                             if(err){
//                                 console.log(err);
//                                 maria.rollback();
//                                 res.json({result : "Fail"})
//                             }
//                         })
//                     }

//                 });
//             }
            
//         });
//         next()   
//     }
// }






router.post('/list/remove', function(req,res){
    if(!req.user){
        return res.status(401).redirect('/')
    }
    console.log(req.body.list_id)
    var list_id = req.body.list_id;
    var member_id = req.user;
    var SelExSql = "SELECT * FROM list where list_id=? && member_id=?";
    var DelExSql = "DELETE from list where list_id=? && member_id=?";
    maria.query(SelExSql,[list_id,member_id],function(err,rows){
        console.log(rows)
        var inandout = rows[0].inandout;
        var ExPrice = rows[0].price;
        var payment = rows[0].payment;
        var payment_dst = rows[0].payment_dst;
        var date = rows[0].list_date;
        maria.query(DelExSql,[list_id,member_id],function(err,rows){
            console.log("삭제 실행")
            if(inandout == "이체"){
                console.log("이체 검색")
                console.log("자산 업데이트")
                var UpSrcpay = "UPDATE payment_sub SET balance = balance - ? WHERE id=? && member_id=?";
                maria.query(UpSrcpay,[parseInt(ExPrice),payment_dst,member_id],function(err,rows){
                    if(!err){
                        var UpDstpay = "UPDATE payment_sub SET balance = balance + ? WHERE id=? &&  member_id=?";
                        maria.query(UpDstpay,[parseInt(ExPrice),payment,member_id],function(err,rows){
                            if(err){
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }else{
                                res.json({result : "Success"})
                            }
                        })
                    } else{
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                }) 
                console.log("자산 업데이트 끝")
                
            }
            if(inandout == "수입"){
                console.log("수입 변경")
                var UPExPaySql = "UPDATE payment_sub SET balance = balance - ? WHERE member_id=? && id=?";
                maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                    if(!err){
                        var UPExDayASql = "UPDATE day_amount SET member_in=member_in-?, member_amount=member_amount-? where member_id=? && date=? ";
                        maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                            if(err){
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }else{
                                res.json({result : "Success"})
                            }
                        })
                    }
                    else{
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                })                    
            }
            if(inandout == "지출"){
                var UPExPaySql = "UPDATE payment_sub SET balance = balance + ? WHERE member_id=? && id=?";
                maria.query(UPExPaySql,[parseInt(ExPrice),payment,member_id],function(err,rows){
                    if(!err){
                        var UPExDayASql = "UPDATE day_amount SET member_out=member_out-?, member_amount=member_amount+? where member_id=? && date=? ";
                        maria.query(UPExDayASql,[parseInt(ExPrice),parseInt(ExPrice),member_id,date],function(err,rows){
                            if(err){
                                console.log(err);
                                maria.rollback();
                                res.json({result : "Fail"})
                            }else{
                                res.json({result : "Success"})
                            }
                        })
                    }
                    else{
                        console.log(err);
                        maria.rollback();
                        res.json({result : "Fail"})
                    }
                })                    
            }
        })
        
    })
})
 
module.exports = router;