module.exports = (router, Users, Locates, Foods)=>{
  router.get('/arrangement/getId',function(req, res, next){
    if(req.user){
      res.status(200).send(req.user.id);
    }else{
      res.status(500);
    }
  })
/*.post('/arrangement/buffet/save',function (req, res, next) {
   Locates.create(req.body, function (err, order) {
        if (err) {
            res.status(400).send(err);
        }
        else{
        console.log('order created!');
        var id = order._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the order with id: ' + id);
        }  
  });
})*/
  .post('/arrangement/buffet/save',function(req,res){
    var data = req.body;

    try{
	const duple = Locates.findOne({id : data.id},function(err, locates){
		if(locates) {
			Locates.findOneAndUpdate({id : data.id},{$set: { location : data.location}}, function(err, locates){
				if(err) console.log(err);
				if(locates) console.log(locates);
			});
		}
		else{
			Locates(data).save();
		}
	});  
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
	return res.status(200).send({success:true, message:"SUCCESS",data : data});     
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
         const location = Locates.findOne({id: id}, function(err, locates){
            if(locates) return res.status(200).send({ success: true, message: 'SUCCESS', locates : locates.location});
            else return res.send({success:false, message:'no data'});
          });
        }else{
	    return res.send({success:false, message:'no id'});
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
