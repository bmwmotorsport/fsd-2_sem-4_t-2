{/* Write an express js script to define one JSON array of 3 objects having properties name and
age. Sort this object according to age. If user requests sorted names in url then all names 
along with age should be printed according to descending order of age. Also, display these 
sorted values on “Sort page” and display JSON object on “Home page” */}

const express = require("express");
const app = express();

const a = [
    {name:'Romil',age:19},
    {name:'ABC',age:21},
    {name:'XYZ',age:35}
]

app.get('/',(req,res)=>{
    res.json(a);
});

app.get('/sort', (req,res)=>{
    res.set('content-type','text/plain');
    var sa = a.sort((a,b)=>b.age-a.age)
    res.send(sa);
});

app.listen(1111);