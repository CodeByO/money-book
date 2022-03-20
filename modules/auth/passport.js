const { unwatchFile } = require('fs');

module.exports = function(app) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    const member = require('../database/Schemas/member');
    const crypto = require('crypto')

    require('./session')(app);
    require('dotenv').config();

    app.use(passport.initialize());
    app.use(passport.session())


    const createHashedPassword = (plainPassword,ExSalt) =>
    new Promise(async (resolve, reject) => {
        crypto.pbkdf2(plainPassword, ExSalt, 100000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64')});
        });
    });
    

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false,
      }, function (inputId, inputPw, done) {
          member.findOne({userId : inputId},'password salt')
            .then(result=>{
                if(!result){
                console.log("존재하는 아이디 없음")
                return done(null, false);
                }
                createHashedPassword(inputPw,result.salt)
                .then((data)=>{
                    if(data.password === result.password){
                        console.log("로그인 성공")
                        return done(null, result._id);
                    }else{
                        console.log("로그인 실패")
                        return done(null, false);
                    }
                })
            })
            .catch(err=>{
                console.log(err);
                return done(null, false);
            })
        
    }));
    
      passport.serializeUser(function (user, done) {
        
        if(user){
            done(null, user)
        }
        
      });
      
      passport.deserializeUser(function (user, done) {
        member.findOne({_id : user},'_id')
            .then(result=>{
                if(!result){
                    console.log("존재하지 않음")
                    return done(null,false)
                }
                
                return done(null,result._id)
            })
            .catch(err=>{
                console.log(err)
                return done(null,false)
            })
      }); 
      return passport;
}