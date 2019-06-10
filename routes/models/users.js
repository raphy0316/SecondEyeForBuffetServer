module.exports = (router, Users)=>{
  router.get('/profile', async (req, res)=>{
    const user = await Users.findOne(req.user);
    if(user) return res.status(200).json(user);
    else return res.status(404).json({message : "user not found"});
  })
  router.get('/users', async (req, res)=>{
    if(req.user.is_admin){

      var users = await Users.find();
      res.status(200).render('userManagement',{title: 'user userManagement',users : users });
    }else
    {
      res.Status(404).render('index',{title: 'express'});

    }
  })

  .get('/:id', (req, res)=>{


  })

  .put('/:id', (req, res)=>{

  })

  .patch('/users/admin' ,async(req, res)=>{

    if(req.user.is_admin){
      var update_admin = req.body.update_admin;//권위 해재 0 권위 상승은 1
      if(update_admin == undefined || update_admin == null) return res.status(400).json({message : "param missing or null"})
      const id = req.body.id;
      if(update_admin){
        try{
          var result = await Users.update({id: id}, {$set : {is_admin : true}});
        }catch(e){
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
        return res.status(200).redirect('/users');
        }else{
          try{
              var result = await Users.update({id: id}, {$set : {is_admin : false}});
          }catch(e){
            if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
            if(e instanceof ValidationError) return res.status(400).json({message: e.message});
            if(e instanceof paramsError) return res.status(400).json({message: e.message});
          }
          return res.status(200).redirect('/users');
        }
      }else return res.status(403).send("excess denied");
  })

  .delete('/users', async (req, res)=>{

    if(req.user.is_admin){
      var user = req.body;
      console.log(user);
      var result = await Users.remove(user);
      if(result) res.status(200);
      else res.status(500).json({message: "server err"});
    }else return res.status(403).send("excess denied");
  });

  return router;
}
