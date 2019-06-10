module.exports = (router,Users, Boards)=>{
  //보드 페이지
  router.get('/boards', function(req, res, next) {
  //  console.log(req.device);//브라우저 같은거 제어
    try{
      Boards.find({},function(err, rawContents){
        res.render('boards',{title:"Board",contents:rawContents});
      })
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200);
  })
  //글올리기 페이지
  .get('/boards/boardUp', function(req, res, next) {
    res.render('boardUp', { title: 'boardUp' });
  })
  //글 저장
  .post('/', function(req, res){
    const data= req.body;
    try{
      if(req.user){
        Boards(data).save();
      }
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200).redirect('/boards');
  })
  //글 보기
  .get('/boards/view/:id', function(req, res, next) {
    var contentId = req.params.id;
    try{
      Boards.findOne({_id: contentId},function(err, rawContent) {
        res.render('boardView',{title:"Board",item:rawContent});
      })
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200);
  })



  return router;
}
