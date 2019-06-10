module.exports = (router, Users, Foods, Locates, passport) =>{
  var auth = require('./models/auth')(router, Users, passport);
  var users = require('./models/users')(router, Users);
  var arrangement = require('./models/arrangement')(router, Users, Locates, Foods);
  router.use('/auth', auth);
  router.use('/users', users);
  router.use('/arrangement', arrangement);

  router.get('/', function(req, res, next) {
    if(req.user){
      const User = req.user;
      console.log(req.user);
      res.render('index',{title: 'express', user : User });
    }else{
      //console.log(req);
      res.render('index',{title: 'express', user : 0});
    }

  });

  return router;
};
