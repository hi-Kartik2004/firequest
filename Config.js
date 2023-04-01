// Import the functions you need from the SDKs you need
const { initializeApp } = require ( "firebase/app");
// import { collection , addDoc } from 'firebase/firestore';
const { getFirestore } = require("firebase/firestore");
const { collection , addDoc , getDocs} = require ('firebase/firestore');
// const   {appp} = require( "./Config");
// const db = require ("firebase/firestore");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// import { getAnalytics } from "firebase/analytics";
// import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDF20aY98ROupC9b4itpbeg5H_mbDDrJU",
  authDomain: "trash-management-87214.firebaseapp.com",
  projectId: "trash-management-87214",
  storageBucket: "trash-management-87214.appspot.com",
  messagingSenderId: "649166086210",
  appId: "1:649166086210:web:befdd07bcfe9ec8ba08ddb",
  measurementId: "G-XG1Z4RGWYL"
};

// Initialize Firebase
const appp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getFirestore(app);
// const db = firebase.firestore();


app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type , Accept"
    );
    next();

})

// const db = firebase.firestore();
const colref = collection(database, 'newusers');
app.get("/" , function(req,res){
    res.send("helo eworld");
})

app.post("/adduser", function(req ,res){
     addDoc(colref , {
          email : req.body.email,
          password : req.body.pass
      })

    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    res.redirect("/");
   
});
// var docRef = collection(database , "newusers").doc("newusers");

newitem = [];

app.get("/getuser" , function(req,res){
   getDocs(colref).then((respond) => { 
    respond.docs.map((item) => {
        //     return item; 
        // item.data() = item.data.json();
       newitem.push(item.data())   
   }
       )
       res.send(newitem)
 
    
});

});



app.listen(3000 , function(req , res){
    console.log("succses datrted")
});

