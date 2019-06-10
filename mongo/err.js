module.exports = (Users, Boards, rndString)=>{

  var user_params = ['id', 'passwd','email','pn' 'name'];//email, pn new
  var board_params = ['title','content']

  Users.pre('save', async function(next, done){//세이브 하기 전에
    const user = this;
    let result = await user_params.every(str => user[str] != undefined && user[str] != null && user[str].length > 0);
    if(!result) done(new paramsError("param missing or null"));
    this.token = this.generateToken();
    next(this);
  });
  Users.post('save', (error, res, next)=>{// 세이브 할때
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });
  Users.post('update', (error, res, next)=>{//업데이트 할때
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Boards.pre('save',async function(next,done) {
    const boards=this;
    let result = await board_params.every(str=>boards[str]!=undefined && boards[str]!=null&&boards[str].length>0);
    if(!result) done(new paramsError("param missing or null"));
    this.token = this.generateToken();
    next(this);
  });
  Boards.post('save', (error, res, next)=>{// 세이브 할때
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });
  Boards.post('update', (error, res, next)=>{//업데이트 할때
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Boards.method('generateToken', ()=>{
    return rndString.generate();//토큰 생성 넘겨주기
  });

  Users.method('generateToken', ()=>{
    return rndString.generate();//토큰 생성 넘겨주기
  });

}
