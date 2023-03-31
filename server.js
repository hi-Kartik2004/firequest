const express=require('express');
const app=express();
const fs=require('fs');

const AdminData=JSON.parse(fs.readFileSync(`./admin.json`, 'utf8'));

//rest api firebase
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require(`./serviceAccountKey.json`);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const getData=async()=>{

    const snapshot = await db.collection('yard').get();
    let returnData=[];
    snapshot.forEach((doc) => {
        var data=[doc.data(),doc.id];
      returnData.push(data);
    });
    return returnData;
}


//local server api

app.use((req,res,next)=>{
    console.log("called");
    next();
})
app.use(express.json());
app.get('',(req,res)=>{
    console.log("called");
    getData().then((data)=>{res.json(data)});
}).post('',(req,res)=>{
    let i=0;
    AdminData.forEach(j=>{if(req.body.name===j.name&&req.body.pwd===j.pwd){ i=1;}});
    if(i==0){
        res.json({status: 'error'});
    }else{
        db.collection('yard').doc(req.body.id).update({"current":req.body.current});
        res.json({status: 'success'});
    }
})


app.listen(8000,()=>console.log("listening on 8000"));

