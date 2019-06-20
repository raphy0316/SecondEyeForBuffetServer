var mongoose = require('mongoose');
import rndString from "randomstring";
mongoose.connect('mongodb://localhost:27017/db');

var name = require('../package.json');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected");
});

var boardSchema = mongoose.Schema({
  title : {type:String},
  content : {type:String},
  writer : {type:String},
  date : {type:String},
  viewcnt : {type: String}
});
var usersSchema = mongoose.Schema({
  id: {type: String},
  passwd: {type: String},
  email:{type: String},//new
  pn:{type: String},//new
  name: {type: String},
  token: {type: String},
  setting: {type: String},
  profile: {type: String},
  profile_img: {type: String},//이미지 url
  facebook_id: {type: String},
  github_id: {type: String},
  twitter_id: {type: String},
  is_admin: {type: Boolean, default: false}//어드민 체크 할때 0: 일반 유저 1:어드민
});
var foodSchema = mongoose.Schema({
  id : {type : String},
  name : {type : String},
  country : {type : String},
  explain : {type : String},
  material : {type : String},
  allergy : {type : String}
});
var locateSchema = mongoose.Schema({
  location : {type : Array},
  id : {type : String},
  pn : {type : String},
  name : {type : String},
  email : {type : String}
});

var Boards = mongoose.model('boards',boardSchema);
var Users = mongoose.model('users', usersSchema);
var Foods = mongoose.model('foods', foodSchema);
var Locates = mongoose.model('locates', locateSchema);

exports.Boards = Boards;
exports.Users = Users;
exports.Locates = Locates;
exports.Foods = Foods;

export default db;
