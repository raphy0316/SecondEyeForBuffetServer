module.exports = (router, Users, passport) =>{
  router.get('/signup', function(req, res, next) {
      res.render('signup',{title:"signup"});
  })
  router.post('/signup', async (req, res) => {
      if(req.body.is_admin == "ustina0409") req.body.is_admin = 1;
      else req.body.is_admin = 0;
      const data = req.body;
      const new_user = new Users(data);
      try{
        var result = await new_user.save();
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
      return res.status(200).redirect('/');
  })

  .post('/signin', passport.authenticate('local'), async (req,res)=>{
      res.status(200).redirect('/');

  })

  .get('/logout', async (req, res)=>{
    try{
      await req.logout();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).redirect('/');
  })

  // .get('/auth/facebook', passport.authenticate('facebook'))
  // .get('/auth/facebook/callback',passport.authenticate('facebook', {
  //       successRedirect: '/',
  //       failureRedirect: '/login_fail' }))
  // .get('/login_success', isAuth, function(req, res){
  //   res.send(req.user);
  // });





  return router;
}
