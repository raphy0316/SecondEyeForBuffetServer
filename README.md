# SecondEyeForBuffetServer
## mobile contest

# auth
## /auth/signin
### request
```
id : {type : String},  
passwd : {type : String},  
```

### respone
```json
{
    "success": true,
    "message": "SUCCESS",
    "user": {
        "is_admin": false,
        "_id": "5d0cdabcd320a61ed677ce5e",
        "id": "test1234",
        "passwd": "test1234",
        "email": "test1234",
        "pn": "test1234",
        "name": "test1234",
        "__v": 0
    }
}
```




## /auth/signup
### request
## /auth/singin
### request
```
id : {type : String},  
passwd : {type : String},  
name : {type : String},  
email : {type : String},  
pn : {type : String}   
is_admin : {type : String}//선택사항 ustina0409 입력시 관리자 계정 생성
```
### respone
```
{
  "success":true,
  "message":"SUCCESS"
}
```

## /auth/logout
### respone
```
{
  "success":true,
  "message":"SUCCESS"
}
```


# users
## /users
```gui 환경으로 유저관리(삭제, 관리자 권한 부여) 가능  
관리자 계정만 접속 가능 (admin,admin) 게정 삭제가 이상한 듯하다. 조심하도록 하자.
```

# arrangement
## /arrangement/buffet/save
### request
```
location : {type : Array}
ex)  
[{x,y,id,num},{x,y,id,num}....]  
x : x 좌표  y : y좌표 id  id : 도형 id  num : 원>0 사각형>1  
```
### respone
```
{
    "success": true,
    "message": "SUCCESS",
    "data": {
        "location": {dddd},
        "id": "5d0cdabcd320a61ed677ce5e"
    }
}
```
한토큰에 중복 저장시에는 duplicate id 

## /arrangement/buffet/food/save
### request
```
id : {type : String},//놓여있는 도형 id  
name : {type : String},//음식이름
country : {type : String},//음식나라  
explain : {type : String},//음식설명  
material : {type : String},//주요재료  
allergy : {type : String}//알러지 유발 물질  
```
### respone
```
{
  "success":true,
  "message":"SUCCESS"
}
```


## /arrangement/host
### request
```
id : {type : String}//업자 id  
```

### respone
```
{
  "success":true,
  "message":"SUCCESS",
  "locates":{
                "id" = "dkdkd",
                "name"="dkdkdk",
                "email"="email",
                "pn" = "0101001010",
                "location" = [{x,y,id,num},....]
             }
}
```
no id :
위에 계정들이랑 뷔페 데이터는 별도 저장이라 데이터를 한번이라도 저장안하면 데이터가 없음 즉 no data란 뜻과도 같다.

## /arrangement/host/food
### request
```
id : {type : String}//도형 id  
```

### respone
```
{
  "success":true,
  "message":"SUCCESS",
  "location":{
              "id" : "gfds",  
              "name" : "pizza",
              "country" : "italia", 
              "explain" : "deliciois",  
              "material" : "meal", 
              "allergy" : "shrimp"
             }
}
```
서버 실행 : pm2 start npm -- start
몽고 디비 실행 : mongod --fork --dbpath ~/MongoDB/datas/ --logpath ~/MongoDB/mongodb.log
