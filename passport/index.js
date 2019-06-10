import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (Users) =>{
  passport.serializeUser((user, done)=>{done(null, user);});
  passport.deserializeUser((obj, done)=>{done(null, obj);});


  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'passwd',
    session: true, // 세션에 저장 여부
    passReqToCallback: true,//리퀘스트 성공시 반환
  }, function(req, id, passwd, done){
    const user = Users.findOne({id: id, passwd: passwd},{_id : 0}, function(err, user){
      if(user) return done(null, user);
      else return done(null, false, {message: "아이디나 비밀번호가 틀렸습니다"})
    });//0은 이건 안가져온다 1은 이건 가져온다

  }));


  return passport;
}
