var express = require('express')
var router = express.Router()

const passport = require('../auth/passport')(router)
const crypto = require('crypto');
const member = require('../database/Schemas/member');

router.post('/auth/local',function (req, res, next) {
    var engNum = /^[a-zA-Z0-9]*$/;
    var password = /^(?=.[A-Za-z])(?=.\d)(?=.[@!%#?&])[A-Za-z\d@!%*#?&]{8,}$/;
    if(true || engNum.test(req.body.id) && password.test(req.body.pw)){
        console.log("정규식 통과")
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.json({ userLogin: false, LoginErr : true})
    
            }else{
                req.login(user, function (err) {
                if (err) { return next(err); }
                req.session.save(function () {
                    res.json({ userLogin: true, LoginErr : false, cookie : user})
                    
                });
            });}
        })(req, res, next);
    }else{
        console.log("정규식 걸림")
        res.json({ userLogin: false, LoginErr : true})
    }

});
router.post('/auth/local/new', function(req,res){ //회원가입
    var num = /^[0-9]*$/;
    var engNum = /^[a-zA-Z0-9]*$/;
    var checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    var password = /^(?=.[A-Za-z])(?=.\d)(?=.[@!%#?&])[A-Za-z\d@!%*#?&]{8,}$/;

    const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });
    
    const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 100000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });


    if(engNum.test(req.body.id) && checkKor.test(req.body.name) && password.test(req.body.pw) && num.test(req.body.age)){
        console.log("정규식 통과")
        member.findOne({userId : req.body.id})
        .then(result=>{
            if(!result){
                createHashedPassword(req.body.pw).then((data)=>{
                    const newMember = new member({
                        userId : req.body.id,
                        password : data.password,
                        name : req.body.name,
                        age : req.body.age,
                        salt : data.salt
                        
                    })
                    newMember.save()
                        .then(()=>{
                            console.log("성공");
                            res.json({SignUp : true,SignUpErr : false});
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.json({SignUp : false,SignUpErr : true});
                        })
                })
            }else{
                console.log("중복걸림")
                res.json({SignUp : false,SignUpErr : true});
            }
        })
        .catch(err=>{
            console.log(err);
            res.json({SignUp : false,SignUpErr : true});
        })
        
    }else{

    

    console.log("정규식 걸림")
    res.json({SignUp : false,SignUpErr : true});
    

    }

})
router.get('/auth/local/out', function(req,res){ //로그아웃
    req.logout();
    res.json({result : "Success"})
})
module.exports = router;