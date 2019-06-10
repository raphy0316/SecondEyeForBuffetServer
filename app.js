import express from 'express';//서버관리 열기
import logger from 'morgan';//서버 데이터 날라오는 에러 로그 출력 지원
import favicon from 'serve-favicon';//페이지 이름 옆에 이미지 지원
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';//저장되어있는 쿠키 가져오기
import cookie from 'cookie';
import path from 'path';
import randomstring from 'randomstring';//랜덤 스트링 뽑아내기
import fs from 'fs';//파일 관리
import axios from 'axios';//아작스는 변수에다가 받아온 값을 정의하지 못함 에이씨오스는 가능 직관적
import moment from 'moment-timezone';//국가나 지역에 맞는 시간 가져오기
import cookieSession from 'cookie-session';//세션 보안 쿠키
import device from 'express-device';

var app = express();

import {Users} from './mongo';
import {Locates} from './mongo';
import {Foods} from './mongo';



// 뷰엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  keys: ['h0t$ix'],//세션 비밀번호
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}))
app.use(device.capture({parseUserAgent: true}));
let passport = require('./passport')(Users);
app.use(passport.initialize());
app.use(passport.session());

require('./func');

//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var router = require('./routes/index')(express.Router(), Users, Foods, Locates, passport);

app.use('/', router);

module.exports = app;
