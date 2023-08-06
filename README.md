# REACT_APP
this is fullstack app which show data send data update data in database and also send selected rows to email 
#INSTALLATION
step1 ) clone or fork 

step2) both in frontend and backend folder type npm i or npm install

step3) in backend folder add .env file and include 
PASSWORD=mongodbAtlas admin  password

(can also use mongodb locally and no need Password in env  if using to run mongodb locally in cmd type mongod or if using shell use mongosh
copy the server link of mongodb and in index.js(backend) paste it in mongoose.connect()

USER=yourgmail which you are sending
PASS=gmail App password(go to your googleaccount on two step verification below that click App password Select gmail and generate passsword

step4) in backend (index.js you also change sender address in mailoptions 

step5) in frontend type npm start to start React Server

step6) in backend folder type node index.js or nodemon index.js (reccomemend nodemon)

 

#DEMO Link of REACT APP 
https://frontend-k89z.onrender.com/

#DEMO Link of Backend Server
https://nodemongo-back.onrender.com
