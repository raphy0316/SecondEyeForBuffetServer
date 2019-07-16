module.exports = (router, Users, passport) =>{
  router.post('/auth/signup', function (req, res) {
      if(req.body.is_admin == "ustina0409") req.body.is_admin = 1;
      else req.body.is_admin = 0;
      const data = req.body;
     
      const new_user = new Users(data);
      try{
	const duple = Users.findOne({id : data.id}, function(err, users){
	    console.log(users);
	    if(users){
		return res.status(200).send({success: false, message : 'duplicate id' });	
	    }
	    else{
	 	var result = new_user.save();
		console.log("is checked");
		return res.status(200).send({success: true, message : 'SUCCESS', user: req.user });	
	    }    
	});
     
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
     
  })

  .post('/auth/signin', passport.authenticate('local'), async (req,res)=>{
      res.status(200).send({ success: true, message: 'SUCCESS', user : req.user })

  })

  .get('/auth/logout', async (req, res)=>{
    try{
      await req.logout();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).send({ success: true, message: 'SUCCESS' });
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
