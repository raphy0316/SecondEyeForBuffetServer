module.exports = (router, Users, Locates, Foods)=>{
  router.get('/arrangement/getId',function(req, res, next){
    if(req.user){
      res.status(200).send(req.user.id);
    }else{
      res.status(500);
    }
  })

  .post('/arrangement/buffet/save',function(req,res){
    const data = req.body;
    try{
        if(req.user){
          data.id = req.user.id
          Locates(data).save();
        }
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
      return res.status(200);
    })
    //id 컨트롤 어케하누
    .post('/arrangement/buffet/food/save',function(req,res){
      const data = req.body;
      try{
        if(req.user){
          Foods(data).save();
        }
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
      return res.status(200);
    })
    //id가 문제
    .post('/arrangement/host',function(req,res){
      const id = req.body.id;
      try{
        if(id){
          const location = Locates.findOne({id: id}, {_id : 0}, function(err, locates){
            if(locates) return res.status(200).send({ success: true, message: 'SUCCESS',location : locates});
            else return res.status(404).json({error: "not found"});
          });
        }
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
    })

    .post('/arrangement/host/food', function(req, res){
      const id = req.body.id;
      try{
        if(id){
          const food = Foods.findOne({id: id}, {_id : 0 }, function(err, foods){
            if(foods) res.status(200).send({ success: true, message: 'SUCCESS',food : foods});
            else return res.status(404).json({error: "not found"});
          });
        }
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
    })

  return router;
}
